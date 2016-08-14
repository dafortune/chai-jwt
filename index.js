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
    const decoded = jwt.decode(this._obj);

    this.assert(
        !!decoded,
        'expected #{this} to be a valid jwt',
        'expected #{this} to not be a valid jwt'
    );

    utils.flag(this, 'object', decoded);
  });

  Assertion.addMethod('claim', function (key, value) {
    const decodedToken = this._obj;

    this.to.have.property.apply(this, arguments);
  });
};
