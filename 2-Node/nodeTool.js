require("dotenv").config();
const { Octokit } = require("@octokit/core");

const regExp = new RegExp(process.argv[2]);

const userName = "juan-fwn";
const repositoryName = "apprenticeship";
const token = process.env.GITHUB_API_KEY;

const getGitHubAPI = async (URL) => {
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.request(URL);

  return response;
};

const getCardInfo = async (URL) => {
  const { data: cardInfo } = await getGitHubAPI(URL);

  return cardInfo.title;
};

const getCardsByColumn = async (URL) => {
  const { data: cardsAPI } = await getGitHubAPI(URL);

  const cards = [];

  for (const card of cardsAPI) {
    const cardTitle = await getCardInfo(card.content_url);
    cards.push(cardTitle);
  }

  return cards;
};

const getColumnsByProject = async (URL) => {
  const { data: columnsAPI } = await getGitHubAPI(URL);

  const columns = [];

  for (const column of columnsAPI) {
    const cards = await getCardsByColumn(column.cards_url);

    columns.push({
      name: column.name,
      projectURL: column.project_url,
      cardsURL: column.cards_url,
      cards,
    });
  }

  return columns;
};

const getProjects = async () => {
  const projects = [];

  const { data: projectsAPI} = await getGitHubAPI(
    `GET /repos/${userName}/${repositoryName}/projects`
  );

  const filteredProjects = projectsAPI.filter((project) =>
    regExp.test(project.name)
  );

  for (const project of filteredProjects) {
    const columns = await getColumnsByProject(project.columns_url);

    projects.push({
      id: project.id,
      name: project.name,
      proyectURL: project.url,
      columnsURL: project.columns_url,
      columns,
    });
  }

  return projects;
};

const showProjects = (projects) => {
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
  const projects = await getProjects();

  showProjects(projects);
};

main();
