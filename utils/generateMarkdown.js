// function to return a license badge based on which license is passed in and ifthere is no license, returns an empty string
function renderLicenseBadge(license,licenseFreeform) {
  if (!license) {
    return "";
  }
  return `![${license} license badge](https://img.shields.io/badge/license-${license}-blue)`;
}

// function to create table of contents based on data values
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
};

//  function to generate usage section including description and optional screen shot
function renderUsage(data){
    var usage = `## Usage`;
    if(data.usage){
        usage += `\n ${data.usage}`;
    }
    if(data.screenshotConfirm){
        usage+= `\n \n ![screen shot of ${data.projectTitle}](${data.screenshotLocation})`;
    }
    return usage;
};


//  function to generate usage section including description and optional screen shot
function renderInstallation(installation){
    var installation = `## Installation`;
    if(installation){
        installation += `\n ${installation}`;
    }
    return installation;
};

// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.projectTitle}

## Description

${data.description}

${renderContents(data)}

${renderInstallation(data.installation)}

${renderUsage(data)}

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
