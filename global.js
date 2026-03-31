const encoding = require('.')

global.TextDecoder = encoding.TextDecoder
global.TextEncoder = encoding.TextEncoder

global.TextDecoderStream = encoding.TextDecoderStream
global.TextEncoderStream = encoding.TextEncoderStream
