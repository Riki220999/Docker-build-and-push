jest.mock('@actions/core');

const core = require('@actions/core');
const github = require('../src/github');

describe('Get default repo & owner name', () => {
  test('Returns the environment variable', () => {
    process.env.GITHUB_REPOSITORY = "Riki2209999/Docker-build-and-push";
    const owner = github.getDefaultOwner();

    expect(owner).toEqual('Riki2209999');
    delete process.env.GITHUB_REPOSITORY;
  });

  test('No environment variable, throws an error', () => {
    const error =
      "Action failed with error Error: context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'";
    core.setFailed = jest.fn();

    github.getDefaultOwner();
    expect(core.setFailed).toHaveBeenCalledWith(error);
  });
});
