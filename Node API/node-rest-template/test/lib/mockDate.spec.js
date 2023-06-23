const { DEFAULT_FAKE_DATE, mockDate } = require('../helpers/mockDate');

describe('mockDate helper', () => {
  describe('new Date instance', () => {
    mockDate();

    describe('using fake date', () => {
      it('should be equal to Fake Date instance', () => {
        const now = new Date();

        expect(now).toEqual(DEFAULT_FAKE_DATE);
      });

      it('should update the date as specified', () => {
        const MS_TO_ADVANCE = 5000;

        jest.advanceTimersByTime(MS_TO_ADVANCE);

        expect(new Date().toISOString()).toEqual(
          new Date(Date.parse(DEFAULT_FAKE_DATE) + MS_TO_ADVANCE).toISOString(),
        );
      });
    });

    describe('using real date', () => {
      it('should be distinct to Fake Date', () => {
        expect(new Date()).not.toBe(DEFAULT_FAKE_DATE);
      });
    });
  });
});
