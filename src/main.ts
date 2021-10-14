import * as core from '@actions/core'
import * as github from '@actions/github'
async function run(): Promise<void> {
  try {
    const token = core.getInput('GITHUB_TOKEN')
    const pullRequestNumber = core.getInput('PullRequestNumber')
    const octokit = github.getOctokit(token)
    const {data: pullRequest} = await octokit.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: parseInt(pullRequestNumber)
    })

    core.setOutput('pullRequestState', pullRequest.state)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
