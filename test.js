const test = require('brittle')
const Hypercore = require('hypercore')
const ram = require('random-access-memory')
const b = require('b4a')
const z32 = require('z32')

const { encode, decode, normalize, isValid } = require('.')

test('encodes/decodes a key as z-base32', async t => {
  const core = new Hypercore(ram)
  await core.ready()
  const core2 = new Hypercore(ram, decode(encode(core.key)))
  await core2.ready()
  t.alike(core2.key, core.key)
})

test('decodes a hex-encoded key', async t => {
  const core = new Hypercore(ram)
  await core.ready()
  t.alike(decode(encode(core.key)), decode(b.toString(core.key, 'hex')))
})

test('decodes an unencoded key', async t => {
  const core = new Hypercore(ram)
  await core.ready()
  t.alike(decode(core.key), core.key)
})

test('decodes an unencoded key', async t => {
  const core = new Hypercore(ram)
  await core.ready()

  const id = encode(core.key)
  t.is(id, normalize(core.key))
  t.is(id, normalize(core.key.toString('hex')))
  t.is(id, normalize(id))
})

test('isValid valid keys', async t => {
  const core = new Hypercore(ram)
  await core.ready()

  t.ok(isValid(core.key), 'buffer key')
  t.ok(isValid(b.toString(core.key, 'hex')), 'hex key')
  t.ok(isValid(encode(core.key)), 'z32 key')
})

test('isValid invalid keys', async t => {
  const invalidZKey = z32.encode(b.alloc(31))
  t.absent(isValid(b.alloc(31)), 'invalid buffer key')
  t.absent(isValid('b'.repeat(63)), 'invalid hex key')
  t.absent(isValid(invalidZKey), 'invalid z32 key')
})

test('invalid keys', t => {
  const keys = [
    'hello world',
    b.alloc(63)
  ]
  for (const key of keys) {
    t.exception(() => encode(key))
  }
})

test('invalid ids', t => {
  const ids = [
    b.alloc(64),
    'hello world',
    Array.from({ length: 52 }).fill('Z').join(''),
    Array.from({ length: 64 }).fill('z').splice(0, 1, 'Z').join('')
  ]
  for (const id of ids) {
    t.exception(() => decode(id))
  }
})
