/* eslint-disable no-console */

const fs = require('fs');

const removeExtension = (fileName) => fileName.split('.')[0];

async function createAllViews(knexConnection) {
  console.log('Fetching views to create...');
  let viewFiles = await fs.promises.readdir(`${__dirname}/views`);
  viewFiles = viewFiles.filter((fileName) => fileName !== '.gitkeep');

  console.log('Creating the following views:', viewFiles.map(removeExtension));
  await Promise.all(
    viewFiles.map(async (fileName) => {
      const viewDefinition = await fs.promises.readFile(`${__dirname}/views/${fileName}`);
      await knexConnection.raw(
        `CREATE OR REPLACE VIEW ${removeExtension(fileName)} AS ${viewDefinition}`,
      );
    }),
  );
  console.log('Views created!');
}

module.exports = createAllViews;
