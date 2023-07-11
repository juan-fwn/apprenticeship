module.exports = {
  PORT: process.env.PORT || 3000,
  API_URL: 'https://jsonplaceholder.typicode.com', // bin/cleanup mark
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key',
};
