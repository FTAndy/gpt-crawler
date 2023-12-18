#!/usr/bin/env node

import { program } from "commander";
import { GithubConfig, crawlerGithubForGPT } from "./index.js";
import packageJSON from '../package.json'
import inquirer from "inquirer";


const messages = {
  url: "What is the URL of the github project you want to crawl?",
  branch: "What is the branch? (default to master)",
};

async function handler(options: GithubConfig) {
  try {
    let {
      githubRepoUrl,
      branch
    } = options;

    const questions = [];

    if (!githubRepoUrl) {
      questions.push({
        type: "input",
        name: "url",
        message: messages.url,
      });
    }

    if (!branch) {
      questions.push({
        type: "input",
        name: "branch",
        message: messages.branch,
      });
    }

    const answers = await inquirer.prompt(questions);

    githubRepoUrl = githubRepoUrl || answers.url;
    branch = branch || answers.branch || 'master';

    console.log(githubRepoUrl, branch)

    crawlerGithubForGPT({
      githubRepoUrl,
      branch: branch
    })

  } catch (error) {
    console.log(error);
  }
}

program.version(packageJSON.version)

program
  .option("-u, --githubRepoUrl <string>", messages.url, "")
  .option("-m, --branch <string>", messages.branch, "")
  .action(handler);

program.parse();
