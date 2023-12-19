#!/usr/bin/env node

import { program } from "commander";
import { GithubConfig, crawlerGithubForGPT } from "./index.js";
import packageJSON from '../package.json'
import inquirer from "inquirer";


const messages = {
  url: "What is the URL of the github project you want to crawl?",
  branch: "What is the branch? (default to master)",
  skipFolders: "What is the folder you want to skip? (use ',' to split)",
};

async function handler(options: GithubConfig) {
  try {
    let {
      githubRepoUrl,
      branch,
      skipFolders
    } = options as GithubConfig & { skipFolders?: string[] | string; } ;

    console.log(skipFolders, 'skipFolders')

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

    if (!skipFolders) {
      questions.push({
        type: "input",
        name: "skipFolders",
        message: messages.skipFolders,
      });  
    }

    const answers = await inquirer.prompt(questions);



    githubRepoUrl = githubRepoUrl || answers.url;
    branch = branch || answers.branch || 'master';
    skipFolders = skipFolders || answers.skipFolders || '';
    skipFolders = typeof skipFolders === 'string' ? skipFolders.split(',').map(s => s.trim()) : []

    console.log({
      githubRepoUrl,
      branch,
      skipFolders
    })

    crawlerGithubForGPT({
      githubRepoUrl,
      branch,
      skipFolders
    })

  } catch (error) {
    console.log(error);
  }
}

program.version(packageJSON.version)

program
  .option("-u, --githubRepoUrl <string>", messages.url, "")
  .option("-m, --branch <string>", messages.branch, "")
  .option("-m, --skipFolders <string>", messages.skipFolders, "")
  .action(handler);

program.parse();
