import { Config } from "./config";
import zod from 'zod';
import { crawl, write } from "./core.js";


const githubConfigSchema = zod.object({
  githubRepoUrl: zod.string(),
  tag: zod.string().optional(),
  branch: zod.string().optional(),
  skipFolders: zod.array(zod.string()).optional(),
})

export type GithubConfig = zod.infer<typeof githubConfigSchema>;


export async function crawlerGithubForGPT(config: GithubConfig) {
  const { githubRepoUrl, tag, branch, skipFolders } = githubConfigSchema.parse(config);

  const path = tag || branch || 'master'

  const treeEndPointUrl = `${githubRepoUrl}/tree/${path}`
  const blobEndPointUrl = `${githubRepoUrl}/blob/${path}`

  const match = [
    {
      // speical case for .md
      // pattern: 'https://github.com/BuilderIO/gpt-crawler/blob/main/**/*.md',
      pattern: `${blobEndPointUrl}/**/*.md`,
      selector: '.markdown-body'
    },
    {
      // other files like .js, .ts, .json, etc
      pattern: `${blobEndPointUrl}/**`,
      selector: '#read-only-cursor-text-area'
    },
    {
      // skip the folder content
      // pattern: "https://github.com/BuilderIO/gpt-crawler/tree/main/**",
      pattern: `${treeEndPointUrl}/${skipFolders?.length ? `!(${skipFolders.join('|')})` : '**'}`,
    },
  ]

  console.log(match)

  const innerConfig: Config = {
    url: treeEndPointUrl,
    match,
    // selector: '#read-only-cursor-text-area',
    maxPagesToCrawl: 500,
    waitForSelectorTimeout: 1000 * 5,
    outputFileName: "output.json",
  };
  

  await crawl(innerConfig);
  await write(innerConfig);
}