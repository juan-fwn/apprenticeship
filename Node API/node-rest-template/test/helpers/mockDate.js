const DEFAULT_FAKE_DATE = new Date('2022-06-15T00:00:00.000Z');

const mockDate = (dateToMock = DEFAULT_FAKE_DATE) => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(dateToMock.getTime());
  });

  afterEach(() => {
    jest.useRealTimers();
  });
};

module.exports = {
  DEFAULT_FAKE_DATE,
  mockDate,
};
