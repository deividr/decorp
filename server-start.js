process.env.NODE_ENV= process.env.NODE_ENV || 'development'
process.env.SERVER_PORT= process.env.SERVER_PORT || '4040'
process.env.JWT_SECRET='0a6b944d-d2fb-46fc-a85e-0295c986cd9f'

process.env.PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEh/YHlmq0l2jniPJkix84v6N5PxBs
7ixY5QC0mRL2gQntE9EfWAYDukN5ImK/t1FzGF/ui3rRtc+Xh7GpnHGT9A==
-----END PUBLIC KEY-----
`

process.env.MONGO_HOST='mongodb://tatooine.mongodb.umbler.com:39096/decorp'
process.env.MONGO_PORT='39096'
require('babel-core/register');
require('babel-polyfill');
require('./server');