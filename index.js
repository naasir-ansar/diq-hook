const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Sequelize with your configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Define the GitHubEvent model
const GitHubEvent = sequelize.define('GitHubEvent', {
  eventName: DataTypes.STRING,
  action: DataTypes.STRING,
});

app.use(bodyParser.json());

app.get('/test', async(req, res) => {
  try {
    res.send("hello GKE!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', async(req, res) => {
  try {
    res.send("Webhook Impl");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle GitHub webhook events
app.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    // Create a new GitHubEvent instance and save it to the database
    const newEvent = await GitHubEvent.create({ eventName: payload.eventName, action: payload.action });
    console.log('Webhook data inserted into PostgreSQL using Sequelize');
    res.status(200).send('Webhook received and stored in PostgreSQL using Sequelize');
  } catch (error) {
    console.error('Error storing webhook data:', error);
    res.status(500).send('Error storing webhook data');
  }
});

// Sync the model with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
