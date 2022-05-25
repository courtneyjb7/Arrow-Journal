const express = require("express");
const mongoose = require("mongoose");

// Add mongdb user services
const entryServices = require("./models/entries-services");

const app = express();
const port = 5000;
const cors = require("cors");
const { resolveConfigFile } = require("prettier");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const dumps = {
  dumps_list: [{ id: "xyz789", content: "My first brain dump!" }],
};

app.get("/dumps", (req, res) => {
  res.send(dumps);
});

app.get("/dumps/:id", (req, res) => {
  const id = req.params.id;
  let result = findDumpById(id);

  if (result === undefined || result.length === 0) {
    res.status(404).send("Resource not found.");
  } else {
    result = { dumps_list: result };
    res.send(result);
  }
});

function findDumpById(id) {
  return dumps["dumps_list"].find((dump) => dump["id"] === id);
}

app.post("/dumps", (req, res) => {
  const dumpToAdd = req.body;
  dumpToAdd.id = generateId();
  addDump(dumpToAdd);
  res.status(201).send(dumpToAdd);
});

function generateId() {
  return Math.random().toString(16).substring(2, 8);
}

function addDump(dump) {
  dumps["dumps_list"].push(dump);
}

app.delete("/dumps/:id", (req, res) => {
  const id = req.params.id;
  const result = deleteDumpById(id);

  if (result === undefined || result.length === 0) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).end();
  }
});

function deleteDumpById(id) {
  for (var i = 0; i < dumps["dumps_list"].length; i++) {
    if (dumps["dumps_list"][i]["id"] === id) {
      let dumpToDelete = dumps["dumps_list"][i];
      dumps["dumps_list"].splice(i, 1);
      return dumpToDelete;
    }
  }
}

app.put("/dumps/:id", (req, res) => {
  const id = req.params.id;
  const dumpToUpdate = req.body;
  const result = editDumpById(id, dumpToUpdate);

  if (result === undefined || result.length === 0) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(201).send(result);
  }
});

function editDumpById(id, dumpToUpdate) {
  const updatedDump = findDumpById(id);
  if (updatedDump !== undefined) {
    updatedDump.content = dumpToUpdate.content;
  }
  return updatedDump;
}
