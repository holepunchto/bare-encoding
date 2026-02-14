module.exports = class PassThroughDecoder {
  constructor(encoding) {
    this.encoding = encoding
  }

  get remaining() {
    return 0
  }

  decode(data) {
    if (ArrayBuffer.isView(data)) {
      data = Buffer.from(data.buffer, data.byteOffset, data.byteLength)
    } else {
      data = Buffer.from(data)
    }

    return data.toString(this.encoding)
  }

  flush() {
    return ''
  }
}
