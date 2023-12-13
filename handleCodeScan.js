const { CodeScan } = require('./models'); // Import your Sequelize PullRequestOpened model

async function handleCodeScan(payload) {
  const {
    alert: {
      url: url,
      state,
      created_at,
      fixed_at,
    },
    commit_oid,
    repository: { 
      id: repository,
      owner: {
        login: author
      }
     },
  } = payload;

  try {
    const newCodeScan = await CodeScan.create({
      url,
      author,
      state,
      created_at,
      fixed_at,
      repository,
      commit_oid,
    });
    console.log('New CodeScan:', newCodeScan.toJSON());
  } catch (error) {
    console.error('Error handling CodeScan:', error);
    throw error;
  }
}

module.exports = handleCodeScan;
