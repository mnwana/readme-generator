/*
GIVEN a command-line application that accepts user input

WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, 
Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

WHEN I enter my project title
THEN this is displayed as the title of the README

WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section 
of the README entitled License that explains which license the application is covered under

WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README
*/

const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

const mockData = {
  name: "Marielle Nwana",
  projectTitle: "README Generator",
  description:
    "A Node application that prompts a user for project information and generates a README file about that project",
  installation:
    "Please install Node.js then download the contents of this repository.",
  usage:
    'Once installed, you can run npm init, then run "node index"  in order to run the program.',
  screenshotConfirm: true,
  screenshotLocation: "assets/images/screenshot.png",
  contributingAuthors: "Marielle Nwana",
  tests: "There are currently no tests for this application.",
  licenseChoice: "MIT",
  userName: "mnwana",
  email: "mariellenwana@gmail.com",
};

// prompt user for input using inquirer
const promptUser = () => {
  return inquirer.prompt([
    // author name
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name");
          return false;
        }
      },
    },
    // project title
    {
      type: "input",
      name: "projectTitle",
      message: "What is the name of your project?",
      validate: (titleInput) => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter a project title");
          return false;
        }
      },
    },
    // description
    {
      type: "input",
      name: "description",
      message: "Please enter a project description?",
      validate: (descriptionInput) => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("Please enter a project description");
          return false;
        }
      },
    },
    // installation
    {
      type: "input",
      name: "installation",
      message: "Please enter a installation instructions",
      validate: (instructionInput) => {
        if (instructionInput) {
          return true;
        } else {
          console.log("Please enter a installation instructions");
          return false;
        }
      },
    },
    // usage
    {
      type: "input",
      name: "usage",
      message: "Please enter a usage instructions",
      validate: (usageInput) => {
        if (usageInput) {
          return true;
        } else {
          console.log("Please enter a usage instructions");
          return false;
        }
      },
    },
    // screen shot location
    {
      type: "confirm",
      name: "screenshotConfirm",
      message: "Would you like to include a screenshot",
      default: false,
    },
    {
      type: "fuzzypath",
      name: "screenshotLocation",
      itemType: "file" | "png" | "jpeg" | "jpg",
      //   rootPath: ,
      default: "./",
      message:
        "Please enter a path for your screenshot. You can start typing the name and suggestions will appear.",
      when: ({ screenshotConfirm }) => {
        if (screenshotConfirm) {
          return true;
        } else {
          return false;
        }
      },
    },
    // contributing authors
    // TODO: change to loop
    {
      type: "input",
      name: "contributingAuthors",
      message: "Who are the other contributing Authors?",
      default: "",
    },
    // tests
    {
      type: "input",
      name: "tests",
      message: "Plese enter how to run a test",
      default: "",
    },
    // questions
    // license
    {
      type: "list",
      name: "license",
      message: "Please choose a license",
      choices: ['Academic Free License v3.0',
      'Apache license 2.0',
      'Artistic license 2.0',
      'Boost Software License 1.0',
      'BSD 2-clause "Simplified" license',
      'BSD 3-clause "New" or "Revised" license',
      'BSD 3-clause Clear license',
      'Creative Commons license family',
      'Creative Commons Zero v1.0 Universal',
      'Creative Commons Attribution 4.0',
      'Creative Commons Attribution Share Alike 4.0',
      'Do What The F*ck You Want To Public License',
      'Educational Community License v2.0',
      'Eclipse Public License 1.0',
      'Eclipse Public License 2.0',
      'European Union Public License 1.1',
      'GNU Affero General Public License v3.0',
      'GNU General Public License family',
      'GNU General Public License v2.0',
      'GNU General Public License v3.0',
      'GNU Lesser General Public License family',
      'GNU Lesser General Public License v2.1',
      'GNU Lesser General Public License v3.0',
      'ISC',
      'LaTeX Project Public License v1.3c',
      'Microsoft Public License',
      'MIT',
      'Mozilla Public License 2.0',
      'Open Software License 3.0',
      'PostgreSQL License',
      'SIL Open Font License 1.1',
      'University of Illinois/NCSA Open Source License',
      'The Unlicense',
      'zLib License',
       "Other"],
      default: "MIT",
    },
    {
      type: "input",
      name: "licenseFreeform",
      message: "Plese enter a license name",
      when: ({ license }) => {
        if (license == "Other") {
          return true;
        } else {
          return false;
        }
      },
    },
    // github name
    {
      type: "input",
      name: "userName",
      message: "Plese enter your GitHub username",
    },
    // email address
    {
      type: "input",
      name: "email",
      message: "Plese enter your email address for questions",
    },
  ]);
};

//function to write README file with file destination and file content as paameters
function writeToFile(fileName, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileData, (err) => {
      if (err) {
        reject(error);
        return;
      }
      resolve({
        ok: true,
        message: "File saved!",
      });
    });
  });
}

//function to initialize app
function init() {
  // get user input
  promptUser()
    .then((readmeData) => {
      console.log(readmeData);
      // get readme text
      return generateMarkdown(readmeData);
    })
    // write readme to file
    .then((readmeContent) => {
      return writeToFile("./dist/README.md", readmeContent);
    });
}

// Function call to initialize app
// init();

function mockInit() {
  console.log(mockData);
  return writeToFile("README.md", generateMarkdown(mockData));
}

mockInit();
