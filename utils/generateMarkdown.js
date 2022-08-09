const licenses = {
  "Academic Free License v3.0": "afl-3.0",
  "Apache license 2.0": "apache-2.0",
  "Artistic license 2.0": "artistic-2.0",
  "Boost Software License 1.0": "bsl-1.0",
  'BSD 2-clause "Simplified" license': "bsd-2-clause",
  'BSD 3-clause "New" or "Revised" license': "bsd-3-clause",
  "BSD 3-clause Clear license": "bsd-3-clause-clear",
  "Creative Commons license family": "cc",
  "Creative Commons Zero v1.0 Universal": "cc0-1.0",
  "Creative Commons Attribution 4.0": "cc-by-4.0",
  "Creative Commons Attribution Share Alike 4.0": "cc-by-sa-4.0",
  "Do What The F*ck You Want To Public License": "wtfpl",
  "Educational Community License v2.0": "ecl-2.0",
  "Eclipse Public License 1.0": "epl-1.0",
  "Eclipse Public License 2.0": "epl-2.0",
  "European Union Public License 1.1": "eupl-1.1",
  "GNU Affero General Public License v3.0": "agpl-3.0",
  "GNU General Public License family": "gpl",
  "GNU General Public License v2.0": "gpl-2.0",
  "GNU General Public License v3.0": "gpl-3.0",
  "GNU Lesser General Public License family": "lgpl",
  "GNU Lesser General Public License v2.1": "lgpl-2.1",
  "GNU Lesser General Public License v3.0": "lgpl-3.0",
  ISC: "isc",
  "LaTeX Project Public License v1.3c": "lppl-1.3c",
  "Microsoft Public License": "ms-pl",
  MIT: "mit",
  "Mozilla Public License 2.0": "mpl-2.0",
  "Open Software License 3.0": "osl-3.0",
  "PostgreSQL License": "postgresql",
  "SIL Open Font License 1.1": "ofl-1.1",
  "University of Illinois/NCSA Open Source License": "ncsa",
  "The Unlicense": "unlicense",
  "zLib License": "zlib",
};

// function to create table of contents based on data values
function renderContents(data) {
  var contents = `## Table of Contents`;
  if (data.installation) {
    contents += `\n - [Installation](#installation)`;
  }
  if (data.usage) {
    contents += `\n - [Usage](#usage)`;
  }
  if (data.contributors) {
    contents += `\n - [Credits](#credits)`;
  }
  if (data.licenseChoice) {
    contents += `\n - [License](#license)`;
  }
  if (data.contribute) {
    contents += `\n - [Contributing](#contributing)`;
  }
  if (data.tests) {
    contents += `\n - [Tests](#tests)`;
  }
  if (data.confirmEmail || data.confirmSite) {
    contents += `\n - [Questions](#questions)`;
  }
  return contents;
}

//  function to generate installation section
function renderDescription(description) {
  var descriptionText = ``;
  if (description) {
    descriptionText += `## Description \n ${description}`;
  }
  return descriptionText;
}

//  function to generate installation section
function renderInstallation(installation) {
  var installationText = ``;
  if (installation) {
    installationText += `## Installation \n ${installation}`;
  }
  return installationText;
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

//  function to generate questions section
function renderContributors(data) {
  var contributorsText = `## Questions`;
  if (data.contributors.length > 0) {
    data.contributors.forEach(contributor => contributorsText += ` \n - [${contributor.name}](https://github.com/${contributor.username}) \n`);
  }
  if (data.confirmEmail || data.confirmSite) {
    if (data.contactSite) {
      contributorsText += `\n - Website: [${data.contactSite}](${data.contactSite})`;
    }
    if (data.contactEmail) {
      contributorsText += `\n - Email me at [${data.contactEmail}](mailto:${data.contactEmail}) with any questions`;
    }
  }
  return contributorsText;
}

//  function to generate installation section
function renderLicense(license, licenseFreeform) {
  var licenseText = ``;
  if (license != "Other") {
    licenseText += `## License \n ${license}`;
  } else {
    licenseText += `## License \n ${licenseFreeform}`;
  }
  return licenseText;
}

// function to return a license badge based on which license is passed in and ifthere is no license, returns an empty string
function renderLicenseBadge(license) {
  if (!license && license != "Other") {
    return "";
  }
  return ` \n ![${license} license badge](https://img.shields.io/badge/license-${licenses[license]}-blue)`;
}

//  function to generate how to contribute section
function renderContribute(contribute) {
  var contributeText = ``;
  if (contribute) {
    contributeText += `## Contributing \n ${contribute}`;
  }
  return contributeText;
}

//  function to generate tests section
function renderTests(tests) {
  var testsText = ``;
  if (tests.length > 0) {
    testsText =  `## Tests`;
    tests.forEach(test => testsText+= `\n ### ${test.name} \n ${test.text} \n ` );
  }
  return testsText;
}

//  function to generate contact section
function renderContact(data) {
  var contactText = ``;
  if (data.confirmEmail || data.confirmSite) {
    contactText += `## Questions`;
    // TODO: make hyperlinks
    // if (data.contactSite) {
    //   contactText += `\n - Website: ${data.contactSite}`;
    // }
    if (data.contactEmail) {
      contactText += `\n - Email: ${data.contactEmail}`;
    }
  }
  return contactText;
}

// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.projectTitle}

${renderDescription(data.description)}

${renderLicenseBadge(data.license)}

${renderContents(data)}

${renderInstallation(data.installation)}

${renderUsage(data)}

${renderContributors(data)}

${renderLicense(data.license, data.licenseFreeform)}


${renderContribute(data.contribute)}

${renderTests(data.tests)}

`;
}

module.exports = { generateMarkdown, licenses };
