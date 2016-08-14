# Chai-JWT
JSON Web tokens helpers for Chai

## Description
A set of helpers for chai that allow you to make assertions on
json web tokens.

## Installation
```
npm i chai-jwt
```

## Usage
```javascript
const chai = require('chai');
const chaiJWT = require('chai-jwt');

chai.use(chaiJWT);
```

## Assertions

### .jwt
Asserts that the provided string has a valid format that
can be parsed as JWT. *Does not check signature or the provided fields.*
If succeed, it changes the context to the decoded token.

Example
```javascript
  const validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InVwZGF0ZTpzb21ldGhpbmciLCJleHAiOjE0NzA3NjE3ODEsImlhdCI6MTQ3MDc2MDc5M30.1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';
  const invalidJWT = 'eyJ0eXAiOiJK22V1QiLCJhbGciOiJIUzI1NiJ9..1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';

  expect(validJWT).to.be.a.jwt; // Doesn't fail
  expect(invalidJWT).to.be.a.jwt; // fails

  expect(validJWT).to.be.a.jwt.and.eql({
    "scope": "update:something",
    "exp": 1470761781,
    "iat": 1470760793
  });
```

### .signedWith(secret)
Asserts that the provided token is signed with the provided secret.

Example
```javascript
  const validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InVwZGF0ZTpzb21ldGhpbmciLCJleHAiOjE0NzA3NjE3ODEsImlhdCI6MTQ3MDc2MDc5M30.1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';

  expect(validJWT).to.be.signedWith('1234'); // Doesn't fail
  expect(validJWT).to.be.signedWith('not the right secret'); // fails
```

### .claim(key, [value])
Alias of `.property` for JWTs. Asserts that the provided token has a given claim. If value is provided
it will also assert the claim value using strict equality.

Example
```javascript
  const validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InVwZGF0ZTpzb21ldGhpbmciLCJleHAiOjE0NzA3NjE3ODEsImlhdCI6MTQ3MDc2MDc5M30.1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';

  expect(validJWT).to.be.have.property('scope'); // Doesn't fail
  expect(validJWT).to.be.have.property('other'); // fails
```
