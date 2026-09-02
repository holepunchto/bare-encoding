/** An error thrown by this module, carrying a `code` identifying the failure. */
declare class EncodingError extends Error {
  /** The error code identifying the failure. */
  readonly code: string

  /**
   * The label passed to `TextDecoder` is not a valid encoding.
   * @param msg - The error message.
   * @returns An `EncodingError` with `code` set to `'INVALID_LABEL'`, for the caller to throw.
   */
  static INVALID_LABEL(msg: string): EncodingError
}

export = EncodingError
