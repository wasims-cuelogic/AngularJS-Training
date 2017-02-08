# AngularJS Assignment

Follow below steps for project setup

***

### PROJECT SETUP

##### Step 1: Clone from Git

1. `git clone https://github.com/wasims-cuelogic/AngularJS-Training.git`
1. `cd AngularJS-Training`
2. `sudo npm install`
3. `sudo bower install --allow-root`

##### Step 2: Run Gulp

Prerequisite (optional): Run `sudo gulp clean` before running the below command. This will delete all files/sub-directories inside the `build` directory.

Command:

`sudo gulp [--env <environment>] [--minify]`

Description:

Builds the Angular project for a specific environment by minifying all files. Final build files are placed in the `build` directory.

Options:

`[--env <environment>]` <br/>
Build the Angular project for a specific environment. Default is *local*.<br/>
Ex: local, development, staging, production

`[--minify]` <br/>
Minify all HTML, CSS and JS files in the Angular project.

Examples:

`sudo gulp --env production` <br/>
`sudo gulp --env staging --minify`

Note: If successfully built, you will be able to access the Angular project at `http://localhost:3001`.

