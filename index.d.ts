import Buffer from 'bare-buffer'
import { ReadableStream, WritableStream } from 'bare-stream/web'

/** WHATWG `TextEncoder`. Encodes strings to UTF-8 bytes. */
export interface TextEncoder {
  /** Always `'utf-8'`. */
  readonly encoding: 'utf-8'

  /**
   * Encode `input` as UTF-8 and return the result as a `Buffer`.
   * @param input - The string to encode.
   */
  encode(input: string): Buffer
  /**
   * Encode `input` as UTF-8 into `destination`. Returns the number of UTF-16 units of `input` read
   * and the number of bytes written.
   * @param input - The string to encode.
   * @param destination - The buffer to write the UTF-8 bytes into.
   */
  encodeInto(
    input: string,
    destination: ArrayBufferView | ArrayBuffer | SharedArrayBuffer
  ): { read: number; written: number }
}

export class TextEncoder {}

export interface TextDecoder {
  /** The encoding this decoder was constructed with, always `'utf-8'`. */
  readonly encoding: 'utf-8'

  /**
   * Decode `input` to a string. If `options.stream` is `true`, buffers any incomplete trailing
   * sequence for the next call instead of including it in the result.
   * @param input - The bytes to decode.
   * @param options - Options; set `stream: true` when `input` is a chunk of a larger stream.
   */
  decode(
    input: ArrayBufferView | ArrayBuffer | SharedArrayBuffer,
    options?: { stream: boolean }
  ): string
}

export class TextDecoder {
  /**
   * Create a `TextDecoder` for `label`. Only `'utf-8'` (and its aliases) is supported; any other
   * label throws.
   * @param label - The encoding label; only `'utf-8'` and its aliases are accepted (default
   * `'utf-8'`).
   * @throws {INVALID_LABEL} `label` is not `'utf-8'` or one of its aliases.
   */
  constructor(label?: string)
}

export interface TextEncoderStream {
  readonly encoding: 'utf-8'
  readonly readable: ReadableStream
  readonly writable: WritableStream
}

export class TextEncoderStream {}

export interface TextDecoderStream {
  readonly encoding: 'utf-8'
  readonly readable: ReadableStream
  readonly writable: WritableStream
}

export class TextDecoderStream {}
