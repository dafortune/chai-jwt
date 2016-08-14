'use strict';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('../index'));

describe('chai-jwt', function() {
  const validJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InVwZGF0ZTpzb21ldGhpbmciLCJleHAiOjE0NzA3NjE3ODEsImlhdCI6MTQ3MDc2MDc5M30.1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';
  const invalidJWT = 'eyJ0eXAiOiJK22V1QiLCJhbGciOiJIUzI1NiJ9..1b4RC22Kpx4X4GWXU-Wgsk4IbeRGVD7tNW-tM-LzkVE';

  describe('.jwt', function() {

    describe('for valid jwts', function() {
      describe('when not negated', function() {
        it('does not fail', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt
          }).not.to.throw();
        });

        it('changes context', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.eql({
              "scope": "update:something",
              "exp": 1470761781,
              "iat": 1470760793
            });
          }).not.to.throw();
        });
      });

      describe('when negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).not.to.be.a.jwt
          }).to.throw();
        });
      });
    });

    describe('for invalid jwts', function() {
      describe('when not negated', function() {
        it('fails', function() {
          expect(function() {
            expect(invalidJWT).to.be.a.jwt
          }).to.throw();
        });
      });

      describe('when negated', function() {
        it('does not fail', function() {
          expect(function() {
            expect(invalidJWT).not.to.be.a.jwt
          }).not.to.throw();
        });
      });
    });

  });

  describe('.signedWith', function() {

    describe('when key is valid', function() {
      describe('and it is negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).not.to.be.signedWith('1234');
          }).to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('does not fails', function() {
          expect(function() {
            expect(validJWT).to.be.signedWith('1234');
          }).not.to.throw();
        });
      });
    });

    describe('when key is invalid', function() {
      describe('and it is negated', function() {
        it('does not fail', function() {
          expect(function() {
            expect(validJWT).not.to.be.signedWith('invalid');
          }).not.to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).to.be.signedWith('invalid');
          }).to.throw();
        });
      });
    });
  });

  describe('jwt.property', function() {

    describe('when token has claim', function() {
      describe('and it is negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.not.have.claim('scope');
          }).to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('does not fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.have.claim('scope');
          }).not.to.throw();
        });
      });
    });

    describe('when does not has claim', function() {
      describe('and it is negated', function() {
        it('does not fail', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.not.have.claim('other');
          }).not.to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.have.claim('other');
          }).to.throw();
        });
      });
    });

    describe('when token has exact claim', function() {
      describe('and it is negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.not.have.claim('scope', 'update:something');
          }).to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('does not fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.have.claim('scope', 'update:something');
          }).not.to.throw();
        });
      });
    });

    describe('when does not has exact claim', function() {
      describe('and it is negated', function() {
        it('does not fail', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.not.have.claim('scope', 'update1:something');
          }).not.to.throw();
        });
      });

      describe('and it is not negated', function() {
        it('fails', function() {
          expect(function() {
            expect(validJWT).to.be.a.jwt.and.have.claim('scope', 'update1:something');
          }).to.throw();
        });
      });
    });
  });
});
