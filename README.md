# spacecore-id-encoding

Encodes Spacecore keys into z-base32 ids, and decodes both hex/z-base32 strings.

```
npm install spacecore-id-encoding
```

## Usage

```js
const { encode, decode, normalize } = require('spacecore-id-encoding')

const id = encode(core.key) // (z-base32 String)
const hexEncoded = core.key.toString('hex')

const core = new Spacecore(ram, decode(id)) 
const core2 = new Spacecore(ram, decode(hexEncoded)) // Will also work with hex

const id2 = normalize(id)
const id3 = normalize(hexEncoded)
```

## API

#### `const id = encode(spacecoreKey)`

Encodes a 32-byte Spacecore key into a z-base32 id.

`spacecoreKey` must be a Buffer or an ArrayBuffer.

#### `const buf = decode(spacecoreId)`

Decodes an id or pear link into a Spacecore key.

If `spacecoreId` is a 52-character String, it will be decoded as z-base32.

If `spacecoreId` is a 64-character String, it will be decoded as hex.

If `spacecoreId` is already a Buffer and is a valid id, it will be returned as-is.

#### `const id = normalize(any)`

Decodes and encodes the input `any` to always return a z-base32 id.

#### `isValid(any)`

Returns a boolean indicating whether the key is a valid spacecore key (meaning that it can be decoded/normalised).

## License

Apache-2.0



