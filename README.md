# Work at ivelum

## Wiki

<img src="https://raw.githubusercontent.com/ivelum/job/master/assets/vault-boy.png" align="right">

This repository contains wiki section about working at ivelum. 
It covers a range of topics, including our tech workflow, 
preferred communication style, and details about employee benefits.

[Everything's in the wiki](http://github.com/ivelum/job/wiki/).

Contact us at [job@ivelum.com](mailto:job@ivelum.com)

## job.ivelum.com source code

We love opensource, so we decided to open access to the source code of
our [vacancies site](https://job.ivelum.com). 
Feel free to investigate and give us a star if you like it :)

## Installation and deployment instructions for job.ivelum.com 

### Start your development environment

1. Clone the repository:

   ```shell
   $ git clone git@github.com:ivelum/job.git
   ```

2. Make sure that you have [Python 3.9+](https://www.python.org/),
   [Node v15 or later](https://nodejs.org/en/) and 
   [Yarn v1.x](https://classic.yarnpkg.com/en/) installed on your machine. 
   Check the versions as:

   ```shell
   $ node -v
   v15.14.0
   
   $ yarn --version
   1.22.10

   $ python --version
   3.9.6
   ```
4. Install the JS dependencies with Yarn:
   
   ```shell
   $ yarn
   ```

5Install the Python dependencies with pip:
   
   ```shell
   $ pip install -r requirements.txt
   ```

5. Start the development server. If you're using a JetBrains IDE, you can use 
   the shared Run/Debug configuration that is included in the repo. 
   Alternatively, start it from the command line:
   ```shell
   $ yarn start
   ```
   
   The command above starts the development server in the "watch" mode, 
   automatically updating the build as you change the source code. The source 
   code is located in the `src` folder and is based on 
   [Gatsby](https://www.gatsbyjs.com/docs/tutorial/). 

### Codestyle checks

Before pushing your work to the repo, please make sure that the code style 
checks pass with your changes. We're using [ESLint](https://eslint.org) for 
JavaScript/React code, [Stylelint](https://stylelint.io) for CSS/SASS, 
and [isort](https://pycqa.github.io/isort/) and 
[flake8](https://flake8.pycqa.org/en/latest/) for python code. 
How to run the checks locally:

```shell
$ yarn eslint

$ yarn stylelint

$ isort .

$ flake8 .
```

### Pre-commit hooks for codestyle

We strongly encourage you to add the code style checks in your local
Git pre-commit hook. How to do this:

1. create a file `.git/hooks/pre-commit` if it doesn't exist yet;
2. open this file for editing and add the following line:
   ```shell
   yarn eslint && yarn stylelint && isort . && flake8 .
   ```
3. make the file executable:
   ```shell
   $ chmod +x .git/hooks/pre-commit
   ```

### Deploy to production

Any push to the `master` branch in this repo will trigger an automated 
deployment to production on AWS, which typically takes ~2 minutes plus a minute 
or two for the CloudFront cache to clear. You can watch the progress and build 
status at the [Actions](https://github.com/ivelum/job-form/actions) tab. 

Please note that we run linters before the build, so the build will fail if the 
code doesn't pass [Codestyle checks](#Codestyle checks).

## License 

Source code is licensed under the MIT license.
All materials in Wiki, code challenges, and vacancy texts are licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
