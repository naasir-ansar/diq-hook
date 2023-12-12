const { PullRequestOpened } = require('./models'); // Import your Sequelize PullRequestOpened model

async function handlePullRequestOpened(payload) {
  const {
    action,
    pull_request: {
      url: Url,
      id,
      user: { login: Author },
      created_at,
      updated_at,
      merged_at,
      closed_at,
      head: { ref: head_branch },
      base: { ref: base_branch },
      comments,
      review_comments,
      commits,
      additions,
      deletions,
      changed_files,
      repository: { id: Repository },
      sender: { login: sender },
    },
  } = payload;

  try {
    const newPullRequest = await PullRequestOpened.create({
      id,
      Url,
      Author,
      created_at,
      updated_at,
      merged_at,
      closed_at,
      head_branch,
      base_branch,
      comments,
      review_comments,
      Commits: commits,
      additions,
      deletions,
      changed_files,
      Repository,
      sender,
      action,
    });
    console.log('New pull request opened:', newPullRequest.toJSON());
  } catch (error) {
    console.error('Error handling pull request opened:', error);
    throw error;
  }
}

module.exports = handlePullRequestOpened;
