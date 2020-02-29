'use strict';

import jsonwebtoken from 'jsonwebtoken';
import { Assertion } from 'chai'
import ChaiPlugin = Chai.ChaiPlugin;
import ChaiUtils = Chai.ChaiUtils;
import AssertionStatic = Chai.AssertionStatic;
import ChaiStatic = Chai.ChaiStatic;

declare global {
 export module Chai {
   interface Assertion {
     signedWith(secret: string): Assertion
     claim(key: string, value?: any): Assertion
   }
   interface TypeComparison {
     jwt: Assertion
   }
 }
}

const chaiJWT: ChaiPlugin = function (chai: ChaiStatic, utils: ChaiUtils) {
  const Assertion = chai.Assertion;

  Assertion.addMethod('signedWith', function (this: AssertionStatic, secret: string) {
    
    let token = this._obj;
    let decoded;

    try {
      decoded = jsonwebtoken.verify(token, secret, { ignoreExpiration: true, ignoreNotBefore: true });
    } catch (e) {}

    this.assert(
      !!decoded,
      "expected #{this} to be signed with #{exp} but wasn't",
      "expected #{this} to not be signed with #{exp}",
      secret
    );
  });

  utils.addProperty(Assertion.prototype, 'jwt', function (this: AssertionStatic) {
    const decoded = jsonwebtoken.decode(this._obj);

    this.assert(
        !!decoded,
        'expected #{this} to be a valid jwt',
        'expected #{this} to not be a valid jwt',
      ''
    );

    utils.flag(this, 'object', decoded);
  });

  Assertion.addMethod('claim', function (this: AssertionStatic, key, value?) {
    const decodedToken = this._obj;
    
    this.assert(Object.keys(decodedToken).indexOf(key) !== -1  && ( value === undefined ? true : decodedToken[key] === value )
      , 'expected #{this} to have have #{exp} but got #{act}'
      , ''
      , key
      , decodedToken
    );
  });
};

export default chaiJWT
