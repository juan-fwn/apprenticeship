const inflection = require('inflection');
const dayjs = require('dayjs');

module.exports = {
  prompt: async ({ prompter }) => {
    let { migrationName } = await prompter.prompt({
      type: 'input',
      name: 'migrationName',
      message: 'Enter migration name:',
    });

    migrationName = inflection.underscore(migrationName.replace(/ /g, '_').replace(/[^\w]/g, ''));

    return {
      fileName: `${dayjs().format('YYYYMMDDHHmmss')}_${migrationName}`,
    };
  },
};
