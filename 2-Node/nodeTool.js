const { Octokit } = require("@octokit/core");

const userName = "juan-fwn";
const repositoryName = "apprenticeship";
const token = "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";

const getGitHubAPI = async (URL) => {
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.request(URL);

  return response;
};

const getCardsInfo = async (URL) => {
  const { data: cardInfo = [] } = await getGitHubAPI(URL);

  return cardInfo.title;
};

const getCardsByColumn = async (URL) => {
  const { data: cardsAPI = [] } = await getGitHubAPI(URL);

  const cards = [];

  for (const card of cardsAPI) {
    const cardTitle = await getCardsInfo(card.content_url);
    cards.push(cardTitle);
  }

  return cards;
};

const getColumnsByProyect = async (URL) => {
  const { data: columnsAPI = [] } = await getGitHubAPI(URL);

  const columns = [];

  for (const column of columnsAPI) {
    const cards = await getCardsByColumn(column.cards_url);

    columns.push({
      name: column.name,
      proyectURL: column.project_url,
      cardsURL: column.cards_url,
      cards,
    });
  }

  return columns;
};

const getProyects = async () => {
  const proyects = [];

  const { data: proyectsAPI = [] } = await getGitHubAPI(
    `GET /repos/${userName}/${repositoryName}/projects`
  );

  for (const proyect of proyectsAPI) {
    const columns = await getColumnsByProyect(proyect.columns_url);

    proyects.push({
      id: proyect.id,
      name: proyect.name,
      proyectURL: proyect.url,
      columnsURL: proyect.columns_url,
      columns,
    });
  }

  return proyects;
};

const showProyects = (projects) => {
  projects.forEach((project) => {
    console.log(
      `-----------------------------------------------
            ${project.name.toUpperCase()}
-----------------------------------------------\n`
    );
    project.columns.forEach((column) => {
      console.log(
        `${column.name.toUpperCase()} :
      `
      );
      column.cards.forEach((card, index, cards) => {
        if (index === cards.length) {
          console.log(`\n`);
        }
        console.log(`\t${card}\n`);
      });
    });
  });
};

const main = async () => {
  const proyects = await getProyects();

  showProyects(proyects);
};

main();
