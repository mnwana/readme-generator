// function that returns a license badge based on which license is passed in and ifthere is no license, returns an empty string
function renderLicenseBadge(license,licenseFreeform) {
  if (!license) {
    return "";
  }
  return `![${license} license badge](https://img.shields.io/badge/license-${license}-blue)`;
}

function renderContents(data){
    var contents = `## Table of Contents`;
    if(data.installation){
        contents += `\n - [Installation](#installation)`;
    }
    if(data.usage){
        contents += `\n - [Usage](#usage)`;
    }
    if(data.credits){
        contents += `\n - [Credits](#credits)`;
    }
    if(data.licenseChoice){
        contents += `\n - [License](#license)`;
    }
    return contents;
    ``
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.projectTitle}

## Description

${data.description}

${renderContents(data)}

## Installation

${data.installation}

## Usage

${data.usage}

## Credits

${data.contributingAuthors}

---

## Badges

${renderLicenseBadge(data.licenseChoice,data.licenseFreeform)}


## How to Contribute


## Tests

${data.tests}
`;
}

module.exports = generateMarkdown;
