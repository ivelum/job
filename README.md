# [job.ivelum.com](https://job.ivelum.com)

This repo hosts everything related to working at [ivelum](https://ivelum.com),
including our [public wiki](http://github.com/ivelum/job/wiki/), the
[code challenges](https://github.com/ivelum/job/tree/master/challenges) that we
use in our job interviews, and the [job.ivelum.com](https://job.ivelum.com)
source code.

## Wiki

<img src="https://raw.githubusercontent.com/ivelum/job/master/assets/vault-boy.png" align="right">

The wiki covers a wide range of topics, including our work processes,
our technologies used, preferred communication style, employee benefits,
etc. Available in two languages:

- [English](http://github.com/ivelum/job/wiki/)
- [Русский](https://github.com/ivelum/job/wiki/Home-RU)

Contact us at [job@ivelum.com](mailto:job@ivelum.com)

## Code challenges

- for [Python developers](https://github.com/ivelum/job/blob/master/challenges/python.md);
- for [PHP developers](https://github.com/ivelum/job/blob/master/challenges/php.md);
- for [Frontend developers](https://github.com/ivelum/job/blob/master/challenges/frontend.md).

If you'd like to complete one of the code challenges and send us your solution,
please apply for the corresponding position first at
[job.ivelum.com](https://job.ivelum.com).

## [job.ivelum.com](https://job.ivelum.com) source code

The instructions below describe how to work with the jobs site source code. Key
technologies used:

- Frontend: [Gatsby.js](https://www.gatsbyjs.com/docs/tutorial/), React, CSS
  modules, SCSS;
- Production: AWS, S3, CloudFront, Lambda;
- Deploy automation: CloudFormation, GitHub Actions, Python scripts;
- Linters: ESLint, Stylelint, Ruff.

### Start your development environment

1. Clone the repository:

   ```shell
   $ git clone git@github.com:ivelum/job.git
   ```

2. Make sure that you have [Node v15 or later](https://nodejs.org/en/) and
   [Yarn v1.x](https://classic.yarnpkg.com/en/) installed on your machine.
   Check the versions as:

   ```shell
   $ node -v
   v15.14.0
   
   $ yarn --version
   1.22.10
   ```
3. Install the JS dependencies with Yarn:

   ```shell
   $ yarn
   ```

4. Start the development server. If you're using a JetBrains IDE, such as
   WebStorm or PyCharm, you can use the shared Run/Debug configuration that is
   included in the repo. Alternatively, start it from the command line:

   ```shell
   $ yarn start
   ```

   The command above starts the development server in the "watch" mode,
   automatically updating the build as you change the source code. The source
   code is located in the `src` folder and is based on
   [Gatsby](https://www.gatsbyjs.com/docs/tutorial/).

### Codestyle checks

Before pushing your work to the repo, please make sure that your changes
pass the code style checks. We use [ESLint](https://eslint.org) for
JavaScript/React code and [Stylelint](https://stylelint.io) for SCSS.
How to run the checks locally:

```shell
$ yarn eslint

$ yarn stylelint
```

### Pre-commit hooks for codestyle

We strongly encourage you to add the code style checks in your local
Git pre-commit hook. Here's how to do this:

1. create a file `.git/hooks/pre-commit` if it doesn't exist yet;
2. open this file for editing and add the following line:

   ```shell
   yarn eslint && yarn stylelint
   ```
3. make the file executable:
   ```shell
   $ chmod +x .git/hooks/pre-commit
   ```

Voila, now codestyle checks will run automatically before every commit on your
machine.

### Deploy to production

Any push to the `master` branch in this repo triggers an automated
deployment to production on AWS, which typically takes ~2 minutes plus a minute
or two for the CloudFront cache to clear. You can watch the progress and build
status [on the Actions tab](https://github.com/ivelum/job-form/actions).

Please note that we run linters before the build, so the build will fail if the
code doesn't pass [Codestyle checks](#codestyle-checks).

### Working with Python sources

Python is used for deploy scripts and the lambda function, which is responsible
for the job applications form processing. If you need to modify these parts:

1. Make sure that you have [uv](https://docs.astral.sh/uv/getting-started/installation/)
   installed:

   ```shell
   $ uv --version
   ```

2. Install the Python dependencies:

   ```shell
   $ uv sync
   ```

3. Breathe normally and work with the source code. When you're ready to push
   your changes to the repo, please check the Python code style and fix any
   problems reported:

   ```shell
   $ uv run dev codestyle
   ```

## License

The [job.ivelum.com](https://job.ivelum.com) source code is licensed under the
MIT license. All materials in Wiki, code challenges, and public website texts
are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
