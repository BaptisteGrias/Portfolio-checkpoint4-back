require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./Config');

app.use(express.json());

app.get('/projects', (req, res) => {
  connection.query('SELECT * FROM projects', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.json(result);
    }
  });
});

app.post('/projects', (req, res) => {
  const { name, github_url } = req.body;
  connection.query('INSERT INTO projects (name, github_url) VALUES (?, ?)', [name, github_url], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving the projects');
    } else {
      res.status(201).send('projects successfully saved');
    }
  });
});

app.put('/projects/:id', (req, res) => {
  const projectsId = req.params.id;
  const projectsPropsToUpdate = req.body;
  connection.query('UPDATE projects SET ? WHERE id = ?', [projectsPropsToUpdate, projectsId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating a projects');
    } else {
      res.status(200).send('projects updated successfully 🎉');
    }
  });
});

module.exports = app;
