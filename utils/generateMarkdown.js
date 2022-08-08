// function to return a license badge based on which license is passed in and ifthere is no license, returns an empty string
function renderLicenseBadge(license, licenseFreeform) {
  if (!license) {
    return "";
  }
  return `
  ## Badges

  ![${license} license badge](https://img.shields.io/badge/license-${license}-blue)`;
}

// function to create table of contents based on data values
// TODO: update to include all possible values 
function renderContents(data) {
  var contents = `## Table of Contents`;
  if (data.installation) {
    contents += `\n - [Installation](#installation)`;
  }
  if (data.usage) {
    contents += `\n - [Usage](#usage)`;
  }
  if (data.credits) {
    contents += `\n - [Credits](#credits)`;
  }
  if (data.licenseChoice) {
    contents += `\n - [License](#license)`;
  }
  return contents;
}

//  function to generate usage section including description and optional screen shot
function renderUsage(data) {
  var usage = ``;
  if (data.usage) {
    usage += `## Usage \n ${data.usage}`;
  }
  if (data.screenshotConfirm) {
    usage += `\n \n ![screen shot of ${data.projectTitle}](/${data.screenshotLocation})`;
  }
  return usage;
}

//  function to generate installation section
function renderInstallation(installation) {
  var installationText = ``;
  if (installation) {
    installationText += `## Installation \n ${installation}`;
  }
  return installationText;
}

//  function to generate installation section
function renderLicense(licenseChoice,licenseFreeform) {
    var licenseText = ``;
    if (licenseChoice) {
        licenseText += `## License \n Licensed ${licenseChoice}`;
    }
    return licenseText;
  }

//  function to generate installation section
function renderDescription(description) {
  var descriptionText = ``;
  if (description) {
    descriptionText += `## Description \n ${description}`;
  }
  return descriptionText;
}

//  function to generate credits section
function renderCredits(credits) {
  var creditsText = ``;
  if (credits) {
    creditsText += `## Credits \n ${credits}`;
  }
  return creditsText;
}

//  function to generate how to contribute section
function renderContribute(contribute) {
  var contributeText = ``;
  if (contribute) {
    contributeText +=  `## How to Contribute \n ${contribute}`;
  }
  return contributeText;
}

//  function to generate how to contribute section
function renderTests(tests) {
  var testsText = ``;
  if (tests) {
    testsText += `## Tests \n ${tests}`;
  }
  return testsText;
}

//  function to generate how to contribute section
function renderContact(data) {
    var contactText = ``
    if (data.contact) {
        contactText += `## Contact Us`;
        if(data.contactSite){
            contactText += ` - Website: ${data.contactSite}`;
        }
        if(data.contactEmail){
            contactText += ` - Email: ${data.contactEmail}`;
        }
        if(data.contactPhone){
            contactText += ` - Phone: ${data.contactPhone}`;
        }
    }
    return contactText;
  }

// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.projectTitle}

${renderDescription(data.description)}

${renderContents(data)}

${renderInstallation(data.installation)}

${renderUsage(data)}

${renderCredits(data.contributingAuthors)}

${renderLicense(data.licenseChoice,data.licenseFreeform)}

---

${renderLicenseBadge(data.licenseChoice, data.licenseFreeform)}

${renderContribute(data.contribute)}

${renderTests(data.tests)}

${renderContact(data)}
`;
}

module.exports = generateMarkdown;
