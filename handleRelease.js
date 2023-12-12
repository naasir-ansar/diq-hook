const { Release } = require('./models'); // Import your Sequelize PullRequestOpened model

async function handleRelease(payload) {
  const {
    release: {
      url: Url,
      id,
      author: { login: Author },
      created_at,
      tag_name,
    },
    repository: { id: Repository },
    sender: { login: sender },
  } = payload;

  try {
    const newRelease = await Release.create({
      id,
      Url,
      Author,
      created_at,
      tag_name,
      Repository,
      sender,
    });
    console.log('New Release:', newRelease.toJSON());
  } catch (error) {
    console.error('Error handling Release:', error);
    throw error;
  }
}

module.exports = handleRelease;
