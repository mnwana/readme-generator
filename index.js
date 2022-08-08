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



const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      // when: ({ confirmAbout }) => {
      //     if (confirmAbout) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   },
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name");
          return false;
        }
      },
    },
  ]);
};

// prompt user for input using inquirer

// project title

// description

// table of contents

// installation

// usage

// screen shot location

// contributing authors

// tests

// questions

// license

// github name

// email address

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
      // get readme text
      return generateMarkdown(readmeData);
    })
    // write readme to file
    .then((readmeContent) => {
      return writeToFile("./dist/README.md", readmeContent);
    });
}

// Function call to initialize app
init();
