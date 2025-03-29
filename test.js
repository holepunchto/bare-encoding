const test = require('brittle')
const { TextEncoder, TextDecoder } = require('.')

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
