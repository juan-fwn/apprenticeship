module.exports = {
  projects: [
    {
      displayName: 'src-tests',
      setupFilesAfterEnv: ['<rootDir>/test/testSetup.js'],
      clearMocks: true,
      restoreMocks: true,
      roots: ['<rootDir>/src/', '<rootDir>/test/'],
      coveragePathIgnorePatterns: ['<rootDir>/test/'],
    },
    {
      displayName: 'lib-tests',
      setupFilesAfterEnv: ['<rootDir>/test/testSetup.js'],
      clearMocks: true,
      restoreMocks: true,
      rootDir: 'lib',
      coveragePathIgnorePatterns: ['<rootDir>/test/'],
    },
  ],
};
