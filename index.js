const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const RepositoryModel = require('./models/repository');
const UserModel = require('./models/user');
const handleCommits = require('./handleCommit');


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
  repository: DataTypes.JSONB,
  sender: DataTypes.JSONB,
  payloadData: DataTypes.JSONB,
});

const Repository = RepositoryModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

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
    const { repository, sender } = payload;
    // Create a new GitHubEvent instance and save it to the database
    const newEvent = await GitHubEvent.create({ 
        repository,
        sender,
        payloadData: payload
       });

    // Create or update repositories and users
    await Repository.upsert({
      id: payload.repository.id,
      url: payload.repository.url,
      name: payload.repository.name,
    });

    await User.upsert({
      id: payload.sender.id,
      url: payload.sender.url,
      login: payload.sender.login,
    });

    // Inside your event handling logic where you receive GitHub events
    const commitsData = payload.commits; // Access the commits array from the event data
    
    if (commitsData && commitsData.length > 0) {
      handleCommits(commitsData)
        .then(() => {
          console.log('Commits handling completed');
          // Any further processing or response logic here
        })
        .catch(error => {
          console.error('Error handling commits:', error);
          // Handle the error or send an appropriate response
        });
    } else {
      console.log('No commits found in the payload');
      // Handle the case where no commits are present
    }
    

    
    
    
    
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
