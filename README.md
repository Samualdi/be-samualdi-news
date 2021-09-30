# Samualdi News App

## Background

<b>Welcome to the Samuali News App repo!</b>

This project is a simple API for accessing data from the nc_news database, allowing users to search for and access articles, topics and comments associated with articles, as well as posting comments on artclies up/down voting speicfic articles themselves.

The repo includes tools to build and seed a PSQL database of the given nc_news data and interact with said data using node-postgres (https://node-postgres.com/).

<b>The hosted version of Samualdi News App can be found here:</b> 
https://samualdi-news.herokuapp.com/api 

## Setup

## Cloning this repo
Before working with this project, you will need to fork and clone the repository to your local machine. To do this: 
- navigate to the main page of this repository and above the list of files click on the green code icon.
- Copy the URL displayed below "Clone with HTTPS".
- Use the git clone command followed by the URL in the command line on your machine (e.g. git clone https://github.com/Samui/bed-restaurant.git ).
- Enter you GitHub username and password (or token) to complete the cloning process.

## Installing dependencies
<b>This repo was developed with Node.js v16.8.0 and PostgreSQL 13.4, and it is recommended these versions are used as a minimum.</b>

To install the dependencies for this repository:
- Navigate into the repository directory on your machine.
- Type npm install into the command line.

<b>Dependencies for this repository include:</b>
- dotenv (https://www.npmjs.com/package/dotenv)
- express (https://expressjs.com/)
- Postgres (https://node-postgres.com/)
- pg-format (https://www.npmjs.com/package/pg-format)
- jest (https://jestjs.io/)
- jest-sorted (https://www.npmjs.com/package/jest-sorted)
- SuperTest (https://www.npmjs.com/package/supertest)

<b>This repo was developed with Node.js v16.8.0 and PostgreSQL 13.4, and it is recommended these versions are used as a minimum.</b>



## Create the relevant .env files
Before running any tests or code, create two .env files to ensure scripts are corrected to the correct database (nc_news or nc_news_test) before running. The scrip in db/connection.js outlines the set up for connecting to the correct database and requires the .env files to assign the relevant database.

To create the necessary files:
- Type touch .env.development to create file.
- Inside the .env.development type PGDATABASE=nc_news (and save the file).
- Type touch .env.test
- Inside the .env.test file type PGDATABASE=nc_news_test (and save the file).

## Seeding the local database
To seed the local database with the provided data:
- Type run npm setup-dbs in the command line to create two databases (one for the full development data and one for test data).
- Type run npm seed in the command line to seed the nc_news database with the development data.
- Add these files to the .gitignore by adding .env.* into the file.

## Running tests
The repo contains two test files:
- app.test.js contains tests to check the functionality of the app and its end points.
- app.utils.js contains test to check the functionality of utility functions used in data manipulation and formatting for seeding and interacting with the database.



