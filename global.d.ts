import * as encoding from '.'

type TextEncoderConstructor = typeof encoding.TextEncoder
type TextDecoderConstructor = typeof encoding.TextDecoder
type TextEncoderStreamConstructor = typeof encoding.TextEncoderStream
type TextDecoderStreamConstructor = typeof encoding.TextDecoderStream

declare global {
  type TextEncoder = encoding.TextEncoder
  type TextDecoder = encoding.TextDecoder
  type TextEncoderStream = encoding.TextEncoderStream
  type TextDecoderStream = encoding.TextDecoderStream

  const TextEncoder: TextEncoderConstructor
  const TextDecoder: TextDecoderConstructor
  const TextEncoderStream: TextEncoderStreamConstructor
  const TextDecoderStream: TextDecoderStreamConstructor
}
