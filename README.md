# A toy
Go to use [Github Copilot workspace](https://code.visualstudio.com/docs/editor/github-copilot#_chat-view) to analyze your code, this repo is tedious.

Inspire by [gpt-crawler](https://github.com/BuilderIO/gpt-crawler)

This package will crawl source code and doc files from the Github repo and generate an output file that can be shoved into GPT for building a repo assistant. You can do all kind of things using this assistant:

- Write README document for the whole project.
- Find potential bugs.
- Analyze and learn the architecture.
- ...more

Here are some GPTs created to analyze code:

- [react-virtuoso](https://chat.openai.com/g/g-WOhTJGfKu-react-virtuoso-analyzer) to analyze https://github.com/petyosi/react-virtuoso
- [gpt-crawler](https://chat.openai.com/g/g-Cnxt38AbK-gpt-crawler-repo-analyzer) to analyze https://github.com/BuilderIO/gpt-crawler

![demo](https://github.com/FTAndy/gpt-crawler/blob/main/demo.png?raw=true)

# Github repo GPT Crawler <!-- omit from toc -->

Crawl a Github repo to generate code files to create a custom GPT

- [Example](#example)
- [Get started](#get-started)
  - [Install](#install)
  - [Start to crawl](#start-to-crawl)
  - [Upload your data to OpenAI](#upload-your-data-to-openai)
    - [Create a custom GPT](#create-a-custom-gpt)
    - [Create a custom assistant](#create-a-custom-assistant)
- [Contributing](#contributing)

## Example

[Here is a custom GPT](https://chat.openai.com/g/g-Cnxt38AbK-gpt-crawler-repo-analyzer) that was made to help answer questions about the repo [gpt-crawler](https://github.com/BuilderIO/gpt-crawler)

> Note that you may need a paid ChatGPT plan to access this feature

## Get started

### Direct Usage
```sh
npx repo-crawler-for-gpt
```

### Install

```sh
npm i repo-crawler-for-gpt
```

### Start to crawl

E.g. to crawl the source code of [gpt-crawler](https://github.com/BuilderIO/gpt-crawler) to a custom GPT

```ts
const {crawlerGithubForGPT } = require("repo-crawler-for-gpt");

crawlerGithubForGPT({
  githubRepoUrl: 'https://github.com/BuilderIO/gpt-crawler',
  branch: 'main',
  // or
  tag: 'v1.0.0'
})

```

### Upload your data to OpenAI

The crawler will generate a file called `output.json` at the root of this project. Upload that [to OpenAI](https://platform.openai.com/docs/assistants/overview) to create your custom assistant or custom GPT.

#### Create a custom GPT

Use this option for UI access to your generated knowledge that you can easily share with others

> Note: you may need a paid ChatGPT plan to create and use custom GPTs right now

1. Go to [https://chat.openai.com/](https://chat.openai.com/)
2. Click your name in the bottom left corner
3. Choose "My GPTs" in the menu
4. Choose "Create a GPT"
5. Choose "Configure"
6. Under "Knowledge" choose "Upload a file" and upload the file you generated
7. Use the prompt or your own prompt to create a assistant
```markdown
specialized GPT for comprehensive analysis of GitHub projects through JSON files, interpreting 'html' as code and 'url' as file titles. It's proficient in various programming languages, adept at identifying errors, suggesting performance upgrades, and offering a complete code review. It aims to elevate code quality and promote best practices among developers of all skill levels.

Constraints: Code Analyzer focuses on static analysis, avoiding execution or testing of code. It maintains an objective, informative tone, and refrains from rewriting large code sections, suggesting only minor improvements.

Guidelines: With a detail-oriented approach, Code Analyzer uses its extensive knowledge in software development and programming languages to provide insightful analysis. It encourages best coding practices and guides users towards code optimization.

Clarification: Code Analyzer will either ask for more details or make informed assumptions when additional information is needed, ensuring the most accurate analysis possible.

Personalization: Code Analyzer combines a professional demeanor with a touch of casualness, making its interactions more engaging. Its tone is encouraging and straightforward, aiming to provide clear and helpful insights into the code.
```

![Gif of how to upload a custom GPT](https://github.com/BuilderIO/gpt-crawler/assets/844291/22f27fb5-6ca5-4748-9edd-6bcf00b408cf)

#### Create a custom assistant

Use this option for API access to your generated knowledge that you can integrate into your product.

1. Go to [https://platform.openai.com/assistants](https://platform.openai.com/assistants)
2. Click "+ Create"
3. Choose "upload" and upload the file you generated

![Gif of how to upload to an assistant](https://github.com/BuilderIO/gpt-crawler/assets/844291/06e6ad36-e2ba-4c6e-8d5a-bf329140de49)
