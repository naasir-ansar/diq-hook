const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const RepositoryModel = require('./models/repository');
const UserModel = require('./models/user');
const handleCommits = require('./handleCommit');
const handlePullRequestOpened = require('./handlePullRequestOpened');
const sequelize = require('./db');
const handlePullRequestClosed = require('./handlePullRequestClosed');
const handleRelease = require('./handleRelease');


const app = express();
const PORT = process.env.PORT || 3000;


// Define the GitHubEvent model
const GitHubEvent = sequelize.define('GitHubEvent', {
  repository: DataTypes.JSONB,
  sender: DataTypes.JSONB,
  payloadData: DataTypes.JSONB,
});

// create required tables
const Repository = RepositoryModel(sequelize, sequelize.DataTypes);
const User = UserModel(sequelize, sequelize.DataTypes);


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
    res.send("Application Healthy");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle GitHub webhook events
app.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    const { repository, sender } = payload;

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

    const eventType = req.get('X-GitHub-Event');

    if(eventType) {
      if (eventType === 'push') {
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
        }
      } else {
        const action = payload.action;
        if (eventType === 'pull_request') {

          if (action === 'opened') {
            handlePullRequestOpened(payload);
          } else if (action === 'closed') {
            // Logic for when a pull request is closed
            handlePullRequestClosed(payload);
          } else {
            // Handle other actions as needed
          }
        }

        if (eventType === 'release') {
          if (action === 'published') {
            handleRelease(payload);
          }

        }
      }
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
