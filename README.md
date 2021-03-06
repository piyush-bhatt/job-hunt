# Job Hunt

Live running instance (deployed on ZEIT): https://job-hunt.piyush-bhatt.now.sh 

Job Hunt is a web application for listing and searching job postings. This is the client side code for the same.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.


This application requires the server instance running to fetch data. [Click Here](https://github.com/piyush-bhatt/job-hunt-server) to access the backend code required to up the server.


## Pre-Requisites

1. [NodeJS](https://nodejs.org/en/)
2. [Angular CLI](https://cli.angular.io/)

## Installation

Enter the folder containing package.json

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies required for Job Hunt from a bash/command prompt.

```bash
npm install
```

Change the SERVER_URL to 'http://localhost:3000/jobs' if running the server instance locally.

## Usage

Once the dependencies are installed, run the application.

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.


The website will list the jobs posted (if any)

Any Job Post that is due to expire in 5 days will have an 'Expiring Soon' text displayed next to it

To Create a new Job Post:

1. Click on the plus icon on top right part of the screen
2. Fill in the form with details
3. Click on Save

To View a Job Post:

1. Click on the row of the table for the job you want to view.
2. An expanded panel will show job description. Click on Apply Now to view more details of the Job and apply for the same.
3. A job details page will open with all the details of the job. Click on Apply Now to visit the application link.

To Filter the Job Posts:

1. Enter any of company name, skills, experience or location to filter the job posts.

To Sort the Job Posts by Location or Experience:

1. Click on any of Location or Experience to sort the job posts.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
