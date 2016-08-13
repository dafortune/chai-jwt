'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (chai, utils) {
  const Assertion = chai.Assertion;

  Assertion.addMethod('signedWith', function (secret) {
    let token = this._obj;
    let decoded;

    try {
      decoded = jwt.verify(token, secret, { ignoreExpiration: true, ignoreNotBefore: true });
    } catch (e) {}

    this.assert(
      !!decoded,
      "expected #{this} to be signed with #{exp} but wasn't",
      "expected #{this} to not be signed with #{exp}",
      secret
    );
  });

  utils.addProperty(Assertion.prototype, 'jwt', function () {
    this.assert(
        !!jwt.decode(this._obj),
        'expected #{this} to be a valid jwt',
        'expected #{this} to not be a valid jwt'
    );
  });

  Assertion.addMethod('claim', function (key, value) {
    let token = this._obj;
    let decoded;

    try {
      decoded = jwt.decode(token);
    } catch (e) {}

    const hasValue = arguments.length > 1;
    const actualValue = decoded && decoded[key];

    if (hasValue) {
      this.assert(
        actualValue === value,
        `expected #{this} to have claim ${key} with value #{exp} but got #{act}`,
        "expected #{this} to not have claim #{act}",
        value,
        actualValue
      );
    } else {

      this.assert(
        decoded && decoded.hasOwnProperty(key),
        `expected #{this} to have claim ${key} but don't have it`,
        `expected #{this} to not have claim ${key} but has it`
      );
    }
  });
};
