const { pick } = require('../../../src/utils/pick');

const thingValidations = require('../../../src/lib/things.sample/things.validations');
const { thing1 } = require('../../fixtures/things.sample');

describe('things/validations', () => {
  describe('create', () => {
    const validThing = pick(thing1, ['name', 'category_id']);

    const itIsInvalid = (params) => {
      it('is invalid', () => {
        expect(thingValidations.create.validate(params).error).toBeTruthy();
      });
    };

    const itIsValid = (params) => {
      it('is valid', () => {
        expect(thingValidations.create.validate(params).error).toBeUndefined();
      });
    };

    describe('when the thing is correct', () => {
      itIsValid(validThing);
    });

    describe('name', () => {
      describe('when it is not present', () => {
        itIsInvalid({ ...validThing, name: undefined });
      });

      describe('when it is present', () => {
        describe('when it is not a string', () => {
          itIsInvalid({ ...validThing, name: 123 });
        });

        describe('when it is a string', () => {
          describe('when its length is less than 3', () => {
            itIsInvalid({ ...validThing, name: 'aa' });
          });

          describe('when its length is grater than or equal to 3', () => {
            itIsValid({ ...validThing, name: 'aaa' });
          });
        });
      });
    });

    describe('category_id', () => {
      describe('when it is not present', () => {
        itIsInvalid({ ...validThing, category_id: undefined });
      });

      describe('when it is present', () => {
        describe('when it is not a number', () => {
          itIsInvalid({ ...validThing, category_id: 'abc' });
        });

        describe('when it is a number', () => {
          itIsValid({ ...validThing, category_id: 123 });
        });

        describe('when it is a string that represents number', () => {
          itIsValid({ ...validThing, category_id: '123' });
        });
      });
    });
  });
});
