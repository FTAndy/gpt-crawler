import { crawlerGithubForGPT } from "./index.js";

crawlerGithubForGPT({
  githubRepoUrl: 'https://github.com/petyosi/react-virtuoso',
  branch: 'master',
  skipFolders: ['blog', 'docs', 'e2e', 'examples', 'site', 'docusaurus']
})
