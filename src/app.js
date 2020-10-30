const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const rep = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };
  repositories.push(rep);
  return response.json(rep);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repIndex = repositories.findIndex(rep => {
    return rep.id === id;
  })
  if (repIndex === -1)
    return response.status(400).send({ error: "Rep não existe" });

  repositories[repIndex].url = url;
  repositories[repIndex].title = title;
  repositories[repIndex].techs = techs;

  return response.json(repositories[repIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repIndex = repositories.findIndex(rep => {
    return rep.id === id;
  });

  if (repIndex === -1)
    return response.status(400).send({ error: "Rep nao existe" });

  repositories.splice(repIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex(rep => {
    return rep.id === id;
  })
  if (repIndex === -1)
    return response.status(400).send({ error: "Rep não existe" });

  repositories[repIndex].likes++;

  return response.json(repositories[repIndex]);
});

module.exports = app;
