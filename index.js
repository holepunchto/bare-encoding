const UTF8Decoder = require('./lib/utf8-decoder')
const PassThroughDecoder = require('./lib/pass-through-decoder')
const errors = require('./lib/errors')

const { TransformStream } = require('bare-stream/web')

exports.TextEncoder = class TextEncoder {
  // https://encoding.spec.whatwg.org/#dom-textencoder-encoding
  get encoding() {
    return 'utf-8'
  }

  // https://encoding.spec.whatwg.org/#dom-textencoder-encode
  encode(input) {
    return Buffer.from(input)
  }

  // https://encoding.spec.whatwg.org/#dom-textencoder-encodeinto
  encodeInto(input, destination) {
    if (ArrayBuffer.isView(destination)) {
      destination = Buffer.from(destination.buffer, destination.byteOffset, destination.byteLength)
    } else {
      destination = Buffer.from(destination)
    }

    return {
      read: input.length,
      written: destination.write(input)
    }
  }
}

exports.TextDecoder = class TextDecoder {
  // https://encoding.spec.whatwg.org/#dom-textdecoder
  constructor(label = 'utf-8') {
    this.encoding = getEncoding(label)

    switch (this.encoding) {
      case 'utf-8':
        this.decoder = new UTF8Decoder()
        break
      default:
        this.decoder = new PassThroughDecoder(this.encoding)
        break
    }
  }

  // https://encoding.spec.whatwg.org/#dom-textdecoder-decode
  decode(input, options = {}) {
    const result = this.decoder.decode(input)

    if (options.stream) return result

    return result + this.decoder.flush()
  }
}

// https://encoding.spec.whatwg.org/#interface-textencoderstream
exports.TextEncoderStream = class TextEncoderStream {
  constructor() {
    const encoder = new exports.TextEncoder()

    this._transform = new TransformStream({
      // https://encoding.spec.whatwg.org/#encode-and-enqueue-a-chunk
      transform(chunk, controller) {
        controller.enqueue(encoder.encode(chunk))
      }
    })
  }

  get encoding() {
    return 'utf-8'
  }

  get readable() {
    return this._transform.readable
  }

  get writable() {
    return this._transform.writable
  }
}

// https://encoding.spec.whatwg.org/#textdecoderstream
exports.TextDecoderStream = class TextDecoderStream {
  constructor() {
    const decoder = new exports.TextDecoder('utf-8')

    this._transform = new TransformStream({
      // https://encoding.spec.whatwg.org/#decode-and-enqueue-a-chunk
      transform(chunk, controller) {
        const value = decoder.decode(chunk, { stream: true })
        if (value) controller.enqueue(value)
      }
    })
  }

  get encoding() {
    return 'utf-8'
  }

  get readable() {
    return this._transform.readable
  }

  get writable() {
    return this._transform.writable
  }
}

// https://encoding.spec.whatwg.org/#concept-encoding-get
function getEncoding(label) {
  switch (label.trim().toLowerCase()) {
    case 'unicode-1-1-utf-8':
    case 'unicode11utf8':
    case 'unicode11utf8':
    case 'unicode20utf8':
    case 'utf-8':
    case 'utf8':
    case 'x-unicode20utf8':
      return 'utf-8'
    default:
      throw errors.INVALID_LABEL(`The label '${label}' is not a valid encoding`)
  }
}
