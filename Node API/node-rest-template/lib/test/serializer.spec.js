const { Serializer } = require('../serializer');

describe('Serializer', () => {
  describe('constructor', () => {
    describe('with no collectionName', () => {
      it('throws an error', () => {
        expect(() => new Serializer()).toThrow();
        expect(() => new Serializer({})).toThrow();
      });
    });

    describe('with collectionName', () => {
      it('stores collectionName and creates an empty meta object', () => {
        const serializer = new Serializer({ collectionName: 'serializers' });
        expect(serializer.collectionName).toEqual('serializers');
        expect(serializer.baseFields).toEqual([]);
        expect(serializer.meta).toEqual({});
      });
    });
  });

  describe('this.baseFields', () => {
    const baseFields = ['a', 'b', 'c'];
    const serializer = new Serializer({ collectionName: 'test' });
    serializer.baseFields = baseFields;
    const objectToSerialize = { a: 1, b: undefined };
    const serializedResult = serializer.serialize(objectToSerialize);

    it('adds all baseFields keys to the serializer output', () => {
      expect(Object.keys(serializedResult)).toEqual(baseFields);
    });

    describe('for keys that are not contained in the object', () => {
      it('outputs null', () => {
        expect(serializedResult.c).toBeNull();
      });
    });

    describe('for keys that are contained in the object', () => {
      describe('with a value of undefined', () => {
        it('outputs undefined', () => {
          expect(serializedResult.b).toBeUndefined();
        });
      });

      describe('with some other value', () => {
        it('outputs that value', () => {
          expect(serializedResult.a).toBe(1);
        });
      });
    });
  });

  describe('this.meta', () => {
    describe('renamed', () => {
      const inputKey = 'keyToRename';
      const outputKey = 'renamedTest';
      const serializer = new Serializer({ collectionName: 'test' });
      serializer.meta[outputKey] = Serializer.renamed(inputKey);

      describe('when the object to serialize does not contain the key', () => {
        const objectToSerialize = {};

        it('outputs null in the renamed key', () => {
          expect(serializer.serialize(objectToSerialize)).toEqual({ [outputKey]: null });
        });
      });

      describe('when the object to serialize does contain the key', () => {
        describe('and its value is undefined', () => {
          const objectToSerialize = { [inputKey]: undefined };

          it('outputs undefined in the renamed key', () => {
            expect(serializer.serialize(objectToSerialize)).toMatchObject({
              [outputKey]: undefined,
            });
          });
        });

        describe('and has some other value', () => {
          const objectToSerialize = { [inputKey]: 123 };

          it('outputs that value the renamed key', () => {
            expect(serializer.serialize(objectToSerialize)).toEqual({ [outputKey]: 123 });
          });
        });
      });
    });

    describe('calculated', () => {
      const outputKey = 'calculatedTest';
      const objectToSerialize = { a: 1 };
      const makeSerializer = (calculationFunction) => {
        const serializer = new Serializer({ collectionName: 'test' });
        serializer.meta[outputKey] = Serializer.calculated(calculationFunction);
        return serializer;
      };

      describe('when the given function throws an error', () => {
        const calculationFunction = () => {
          throw new Error('cant serialize');
        };

        it('outputs null in the calculated key', () => {
          expect(makeSerializer(calculationFunction).serialize(objectToSerialize)).toEqual({
            [outputKey]: null,
          });
        });
      });

      describe('when the given function returns a value', () => {
        const calculationFunction = (object) => `some value: ${object.a}`;

        it('outputs the value in the calculated key', () => {
          expect(makeSerializer(calculationFunction).serialize(objectToSerialize)).toEqual({
            [outputKey]: 'some value: 1',
          });
        });
      });
    });

    describe('nested', () => {
      const inputKey = 'nestedInput';
      const outputKey = 'nestedOutput';
      const nestedSerializer = new Serializer({ collectionName: 'nested' });
      nestedSerializer.baseFields = ['a', 'b'];
      const testSerialize = (objectToSerialize) => {
        const serializer = new Serializer({ collectionName: 'test' });
        serializer.meta[outputKey] = Serializer.nested(inputKey, nestedSerializer);
        return serializer.serialize(objectToSerialize);
      };

      describe('when the object to serialize does not contain the key', () => {
        const objectToSerialize = {};

        it('outputs null in the nested key', () => {
          expect(testSerialize(objectToSerialize)).toEqual({ [outputKey]: null });
        });
      });

      describe('when the object to serialize does contain the key', () => {
        describe('and its an array', () => {
          const objectToSerialize = {
            [inputKey]: [
              { a: '1', c: '2' },
              { a: '3', b: '4' },
            ],
          };

          it('outputs the serialized array in the nested key', () => {
            expect(testSerialize(objectToSerialize)).toMatchObject({
              [outputKey]: [
                { a: '1', b: null },
                { a: '3', b: '4' },
              ],
            });
          });
        });

        describe('and its an object', () => {
          const objectToSerialize = { [inputKey]: { a: '1', c: '1' } };

          it('sets the renamed key to that value', () => {
            expect(testSerialize(objectToSerialize)).toEqual({
              [outputKey]: { a: '1', b: null },
            });
          });
        });
      });
    });
  });

  describe('serialize', () => {
    const serializer = new Serializer({ collectionName: 'asdf' });

    describe('when the argument is not of type object', () => {
      it('returns null', () => {
        expect(serializer.serialize(false)).toBeNull();
        expect(serializer.serialize(true)).toBeNull();
        expect(serializer.serialize('asdf')).toBeNull();
        expect(serializer.serialize(null)).toBeNull();
        expect(serializer.serialize(undefined)).toBeNull();
        expect(serializer.serialize(1)).toBeNull();
      });
    });

    describe('when the argument is an array', () => {
      it('nests the result in an object with a this.collectionName key', () => {
        expect(serializer.serialize([])).toEqual({ asdf: [] });
      });
    });
  });
});
