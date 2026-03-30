const test = require('brittle')
const { TextEncoder, TextDecoder, TextEncoderStream, TextDecoderStream } = require('.')

test('TextEncoder', (t) => {
  const str = 'Hello 😄'

  const enc = new TextEncoder()

  t.alike(enc.encode(str), Buffer.from(str))

  const buf = Buffer.alloc(Buffer.byteLength(str))

  t.alike(enc.encodeInto(str, buf), {
    read: 8,
    written: buf.byteLength
  })

  t.alike(buf, Buffer.from(str))
})

test('TextDecoder', (t) => {
  const str = 'Hello 😄'
  const buf = Buffer.from(str)

  const dec = new TextDecoder()

  t.is(dec.decode(buf), str)

  t.is(dec.decode(buf.subarray(0, 7), { stream: true }), 'Hello ')
  t.is(dec.decode(buf.subarray(7), { stream: true }), '😄')
})

test('TextEncoderStream', async (t) => {
  t.plan(3)

  const stream = new TextEncoderStream()

  t.is(stream.encoding, 'utf-8')

  const writer = stream.writable.getWriter()
  const reader = stream.readable.getReader()

  writer.write('€')
  writer.close()

  t.alike(await reader.read(), { value: Buffer.of(0xe2, 0x82, 0xac), done: false })
  t.alike(await reader.read(), { value: undefined, done: true })
})

test('TextDecoderStream', async (t) => {
  t.plan(3)

  const stream = new TextDecoderStream()

  t.is(stream.encoding, 'utf-8')

  const writer = stream.writable.getWriter()
  const reader = stream.readable.getReader()

  writer.write(Buffer.of(0xe2))
  writer.write(Buffer.of(0x82))
  writer.write(Buffer.of(0xac))
  writer.close()

  t.alike(await reader.read(), { value: '€', done: false })
  t.alike(await reader.read(), { value: undefined, done: true })
})
