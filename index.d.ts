import Buffer from 'bare-buffer'
import { ReadableStream, WritableStream } from 'bare-stream/web'

export interface TextEncoder {
  readonly encoding: 'utf-8'

  encode(input: string): Buffer
  encodeInto(
    input: string,
    destination: ArrayBufferView | ArrayBuffer | SharedArrayBuffer
  ): { read: number; written: number }
}

export class TextEncoder {}

export interface TextDecoder {
  readonly encoding: 'utf-8'

  decode(
    input: ArrayBufferView | ArrayBuffer | SharedArrayBuffer,
    options?: { stream: boolean }
  ): string
}

export class TextDecoder {
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
