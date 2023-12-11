const { Commit } = require('./models'); // Import your Sequelize Commit model

async function handleCommits(commitData) {
  try {
    for (const commit of commitData) {
      const newCommit = await Commit.create({
        Id: commit.id,
        Message: commit.message,
        Author: commit.author.username,
        added_files_count: commit.added.length,
        modified_files_count: commit.modified.length,
        removed_files_count: commit.removed.length,
        timestamp: new Date(commit.timestamp),
      });
      console.log('New commit added:', newCommit.toJSON());
    }
  } catch (error) {
    console.error('Error creating commits:', error);
    throw error;
  }
}

module.exports = handleCommits;
