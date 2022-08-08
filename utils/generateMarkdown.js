// function that returns a license badge based on which license is passed in and ifthere is no license, returns an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return "";
  }
  return `https://img.shields.io/badge/license-${license}-blue`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.projectTitle}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${data.installation}

## Usage

${data.usage}

## Credits

${data.contributingAuthors}

---

## Badges

${renderLicenseBadge}


## How to Contribute


## Tests

${data.tests}
`;
}

module.exports = generateMarkdown;
