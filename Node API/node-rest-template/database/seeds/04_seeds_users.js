const { hash } = require('../../src/utils/hash.js');

const password1 = hash('admin');
const password2 = hash('user1');
const password3 = hash('user2');

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([
    {
      email: 'admin@gmail.com',
      full_name: 'Admin Admin',
      photo_path:
        'https://c8.alamy.com/compes/r5yaeg/el-engranaje-y-la-palabra-admin-ilustracion-3d-r5yaeg.jpg',
      password_hash: password1.passwordHash,
      password_salt: password1.passwordSalt,
    },
    {
      email: 'user1@gmail.com',
      full_name: 'User One',
      photo_path:
        'https://c8.alamy.com/compes/r5yaeg/el-engranaje-y-la-palabra-admin-ilustracion-3d-r5yaeg.jpg',
      password_hash: password2.passwordHash,
      password_salt: password2.passwordSalt,
    },
    {
      email: 'user2@gmail.com',
      full_name: 'User Two',
      photo_path:
        'https://c8.alamy.com/compes/r5yaeg/el-engranaje-y-la-palabra-admin-ilustracion-3d-r5yaeg.jpg',
      password_hash: password3.passwordHash,
      password_salt: password3.passwordSalt,
    },
  ]);
};
