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
const { generateMarkdown, licenses } = require("./utils/generateMarkdown.js");

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

const mockData = {
  projectTitle: 'README Generator',
  description: 'A Node application that prompts a user for project information and generates a README file about that project',
  installation: 'Please install Node.js then download the contents of this repository.',
  usage: 'Once installed, you can run npm init, then run "node index"  in order to run the program.',
  screenshotConfirm: true,
  screenshotLocation: 'assets/images/screenshot.png',
  contribyte: 'You cannot contribute :)',
  confirmEmail: true,
  contactEmail: 'mariellenwana@gmail.com',
  confirmSite: true,
  contactSite: 'mariellenwana.com',
  license: 'MIT',
  contributors: [
    {
      name: 'Marielle Nwana',
      username: 'mnwana',
      confirmAddCont: true
    },
    { name: 'Molly', username: 'mcat123', confirmAddCont: false }
  ],
  tests: [
    {
      name: 'Test 1',
      username: 'please test this works!',
      confirmAddTest: false
    }
  ]
};

// function to prompt user for input using inquirer
const promptProject = () => {
  return inquirer.prompt([
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
    // // contributing authors
    // // TODO: change to loop that takes name and gh profile for each
    // {
    //   type: "input",
    //   name: "contributingAuthors",
    //   message: "Who are the other contributing Authors?",
    //   default: "",
    // },
    // // TODO: change to loop that takes test name and test text for each
    // // tests
    // {
    //   type: "input",
    //   name: "tests",
    //   message: "Plese enter how to run a test",
    //   default: "",
    // },
    // contribute
    {
      type: "input",
      name: "contribyte",
      message: "Plese enter how people can contribute to the project:",
      default: "",
    },
    // questions
    {
      type: "confirm",
      name: "confirmEmail",
      message: "Would you like to include an email for contact?",
      default: true,
    },
    {
      type: "input",
      name: "contactEmail",
      message: "What is your email address?",
      default: true,
      when: ({ confirmEmail }) => confirmEmail == true,
    },
    {
      type: "confirm",
      name: "confirmSite",
      message: "Would you like to include a website for contact?",
      default: true,
    },
    {
      type: "input",
      name: "contactSite",
      message: "What is your website URL?",
      default: true,
      when: ({ confirmSite }) => confirmSite == true,
    },
    // license
    {
      type: "list",
      name: "license",
      message: "Please choose a license",
      choices: Object.keys(licenses),
      default: "Other",
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
  ]);
};

// prompt user for contributors
const promptContributors = (readmeData) => {
  if (!readmeData.contributors) {
    readmeData.contributors = [];
  }
  console.log(`
  =================
  Add a New Contributor
  =================
  `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the contributor's name?",
      },
      {
        type: "input",
        name: "username",
        message: "What is the contributor's GitHub username?",
      },
      {
        type: "confirm",
        name: "confirmAddCont",
        message: "Would you like to add another contributor?",
      },
    ])
    .then((contributorData) => {
      readmeData.contributors.push(contributorData);
      if (contributorData.confirmAddCont) {
        return promptContributors(readmeData);
      } else {
        return readmeData;
      }
    });
};

const promptTests = (readmeData) => {
  if (!readmeData.tests) {
    readmeData.tests = [];
  }
  console.log(`
  =================
  Add a New Test
  =================
  `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the test name?",
      },
      {
        type: "input",
        name: "username",
        message: "What are the instructions to run the test?",
      },
      {
        type: "confirm",
        name: "confirmAddTest",
        message: "Would you like to add another test?",
      },
    ])
    .then((testData) => {
      readmeData.tests.push(testData);
      if (testData.confirmAddTest) {
        return promptTests(readmeData);
      } else {
        return readmeData;
      }
    });
};

//function to write README file with file destination and file content as paameters
function writeToFile(fileName, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileData, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "File saved!",
      });
    });
  });
}

// //function to initialize app
// function init() {
//   // get user input
//   promptProject()
//     .then((readmeData) => {
//       console.log(readmeData);
//       // get readme text
//       return generateMarkdown(readmeData);
//     })
//     // write readme to file
//     .then((readmeContent) => {
//       return writeToFile("./dist/README.md", readmeContent);
//     });
// }

//function to initialize app
function init() {
  // get user input
  promptProject()
    .then(promptContributors)
    .then(promptTests)
    .then((readmeData) => {
      console.log(readmeData);
      // get readme text
      return generateMarkdown(readmeData);
    })
    // write readme to file
    .then((readmeContent) => {
      return writeToFile("/README.md", readmeContent);
    });
}

function mockInit() {
  console.log(mockData);
  return writeToFile("README.md", generateMarkdown(mockData));
}

// Function call to initialize app
// init();
mockInit();
