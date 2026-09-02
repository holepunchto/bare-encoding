import * as encoding from '.'

/** The type of the `TextEncoder` class, used to type the global `TextEncoder` constructor. */
type TextEncoderConstructor = typeof encoding.TextEncoder
/** The type of the `TextDecoder` class, used to type the global `TextDecoder` constructor. */
type TextDecoderConstructor = typeof encoding.TextDecoder
type TextEncoderStreamConstructor = typeof encoding.TextEncoderStream
type TextDecoderStreamConstructor = typeof encoding.TextDecoderStream

declare global {
  /** WHATWG `TextEncoder`. Encodes strings to UTF-8 bytes. */
  type TextEncoder = encoding.TextEncoder
  /** WHATWG `TextDecoder`. Decodes bytes to strings using the encoding given at construction. */
  type TextDecoder = encoding.TextDecoder
  type TextEncoderStream = encoding.TextEncoderStream
  type TextDecoderStream = encoding.TextDecoderStream

  const TextEncoder: TextEncoderConstructor
  const TextDecoder: TextDecoderConstructor
  const TextEncoderStream: TextEncoderStreamConstructor
  const TextDecoderStream: TextDecoderStreamConstructor
}
