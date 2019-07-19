#!/usr/bin/env node
const fs = require('fs');
const path = require('path')
const chalk = require('chalk');
const shell = require('shelljs')

if (!shell.which('git')) {
  shell.echo(chak.red('Sorry, this script requires git'))
  shell.exit(1)
}

const projectName = process.argv[2] || 'new-react-app'
shell.echo(chalk.blue(`Project Name -> ${projectName}`))
// clone the repo
shell.echo(chalk.cyan(`Cloning The Repo 💻`))
shell.exec(`git clone --depth=1 https://github.com/Shinkei/shinkei-react-boilerplate.git ${projectName}`, {silent: true})
// remove git information
shell.echo(chalk.magenta(`Cleaning Git Info 🧹`))
shell.cd(projectName)
shell.rm('-rf', '.git')

const packageRoute = path.join(process.cwd(), `/package.json`)
// wait until the repo is cloned
shell.echo(chalk.gray(`Waiting... 😤`))
const now = Date.now()
const future = now + 5000
while (Date.now() < future){/* wait */}


// modify the package.json file
shell.echo(chalk.green(`Updating package json ✍`))
let package = JSON.parse(fs.readFileSync(packageRoute, 'utf8'));
package.name = projectName
package.description = `${projectName} description`
delete package.repository
delete package.author
delete package.repository
delete package.bugs
delete package.homepage
delete package.keywords

package = JSON.stringify(package, null, 2)
fs.writeFileSync(packageRoute, package)

//create a new repository and commit the files
shell.echo(chalk.blueBright(`Ini git project 📸`))
shell.exec('git init', {silent: true})
shell.exec('git add .', {silent: true})
shell.exec('git commit -m "initial commit"', {silent: true})

// init npm with the "new data"
shell.echo(chalk.greenBright(`Ini git project 📓`))
shell.exec('npm init -y', {silent: true})
// install all dependencies
shell.echo(chalk.yellowBright.bgBlack(`Installing dependencies... 📦`))
shell.exec('npm i', {silent: true})
shell.echo(chalk.yellowBright.bgBlack(`Finished! 🎉`))