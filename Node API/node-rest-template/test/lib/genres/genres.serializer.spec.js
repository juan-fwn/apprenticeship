const { GenreSerializer } = require('../../../src/lib/genres');

describe('genres/serializer', () => {
  const serviceOutput = {
    name: 'g_1',
  };

  describe('by default', () => {
    const serializer = new GenreSerializer();

    it('serializes properly', () => {
      const serializerOutput = {
        name: 'g_1',
      };

      expect(serializer.serialize(serviceOutput)).toEqual(serializerOutput);
    });
  });
});
