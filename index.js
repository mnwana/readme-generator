// import modules & licenses object
const fs = require("fs");
const inquirer = require("inquirer");
const { generateMarkdown, licenses } = require("./utils/generateMarkdown.js");

// add file storage prompt for inquirer
inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

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
    // {
    //   type: "confirm",
    //   name: "confirmSite",
    //   message: "Would you like to include a website for contact?",
    //   default: true,
    // },
    // {
    //   type: "input",
    //   name: "contactSite",
    //   message: "What is your website URL?",
    //   default: true,
    //   when: ({ confirmSite }) => confirmSite == true,
    // },
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

// function to prompt user for contributor information
const promptContributors = (readmeData) => {
  // create contributors array if not already in readmeData
  if (!readmeData.contributors) {
    readmeData.contributors = [];
  }
  console.log(`
  =================
  Add a New Contributor
  =================
  `);
  // get contributor names and github user names and return object
  return (
    inquirer
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
        // confirm if they want to add additional users
        {
          type: "confirm",
          name: "confirmAddCont",
          message: "Would you like to add another contributor?",
        },
      ])
      // push contributor object to array
      .then((contributorData) => {
        readmeData.contributors.push(contributorData);
        // if they want to add additional users, call promptContributors for another contributor
        if (contributorData.confirmAddCont) {
          return promptContributors(readmeData);
        } else {
          return readmeData;
        }
      })
  );
};

//  function to prompt user for test information
const promptTests = (readmeData) => {
  // create tests array if not already in readmeData
  if (!readmeData.tests) {
    readmeData.tests = [];
  }
  console.log(`
  =================
  Add a New Test
  =================
  `);
  // get test names and description and return object
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the test name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a test name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "text",
        message: "What are the instructions to run the test?",
        validate: (testText) => {
          if (testText) {
            return true;
          } else {
            console.log("Please enter test instructions");
            return false;
          }
        },
      },
      // confirm if they want to add additional tests

      {
        type: "confirm",
        name: "confirmAddTest",
        message: "Would you like to add another test?",
      },
    ])
    .then((testData) => {
      // push tests object to array
      readmeData.tests.push(testData);
      // if they want to add additional tests, call promptTests for another test
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

//function to initialize app
function init() {
  // if user inputs mock in command line arguments, run app using mock data
  if (process.argv[2] == "mock") {
    console.log(mockData);
    return writeToFile("README.md", generateMarkdown(mockData));
  } else {
    // get user input for project
    promptProject()
      // get user input for contributors
      .then(promptContributors)
      // get user input for tests
      .then(promptTests)
      .then((readmeData) => {
        // get readme template from inputs
        return generateMarkdown(readmeData);
      })
      // write readme to file
      .then((readmeContent) => {
        return writeToFile("README.md", readmeContent);
      });
  }
}

// mock data used by test run
const mockData = {
  projectTitle: "README Generator",
  description:
    "A command-line application that dynamically generates a professional README.md file from a user's input using the Inquirer package",
  installation:
    'To install this application, please ensure you are using the current LTS version of Node.js found on the Node.js site. Download this repository once Node.js. Once downloaded, you can run "node index.js" in the root of the downloaded folder to run the application.',
  usage:
    'This application will provide you with prompts once you run "node index.js". These prompts will take user input to fill in the README file for your project.',
  screenshotConfirm: true,
  screenshotLocation: "assets/images/screenshot.png",
  contribyte:
    "You can contribute by creating branches or forks of this code and making requests to merge into the main branch. You can also make GitHub issues directly within this repository.",
  confirmEmail: true,
  contactEmail: "mariellenwana@gmail.com",
  license: "MIT",
  contributors: [
    {
      name: "Marielle Nwana",
      username: "mnwana",
      confirmAddCont: false,
    },
  ],
  tests: [
    {
      name: "Mockdata",
      text: "Run 'node index mock' to test this application using mock data.",
      confirmAddTest: false,
    },
  ],
};

// Function call to initialize app
init();
