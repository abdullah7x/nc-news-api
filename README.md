# Northcoders News API

## Background

As part of my coding adventure as a Northcoders student, I have created an API for programmatically retrieving application data. The purpose is to replicate the development of a real-world backend service which I hope will eventually provide this information to the front end architecture.

This server can be used to obtain `articles`, `comments`, `users`, and `topics`, as well as tools for `adding`, `deleting`, and `updating` information about them in various ways.

## Hosting

### Here is a link to a hosted version of the app: https://my-be-project.herokuapp.com/api

## Cloning the repo

In order to clone the repo you will firstly need to fork it to your github. You can then copy the clone link in the forked repo, type git clone in your terminal and then paste the clone link in like this:

```
git clone <clone link from forked repo>
```

## Installing dependencies

In the making of this project the following dependencies were used:

- Express.js
- pg
  - pg-format
- Jest
  - jest-sorted
- Supertest
- dotenv

Simply run the following command in your terminal to ensure the necessary dependencies are added:

```
npm i
```

## Connecting to the databases

A '.env.development' and a '.env.test' file must be created in order to connect to one of the two databases provided as part of this project. The first will require the inclusion of 'PGDATABASE=nc news', while the second will require the addition of 'PGDATABASE=nc news test'.

## Creating and seeding local databases

In order to create and seed the above mentioned databases with information you will merely need to run the following commands in your terminal:

```
npm run setup-dbs
npm run seed
```

## Running the tests

This project was constructed using `TDD` (Test Driven Development). If you so wish you can run these same tests yourself by running the following in your terminal:

```
npm test
```

## Postgres and Node.js

As mentioned above these dependencies are the backbone of this project. The minimum versions required to run this application are `V12.9` and `V17.8.0` respectively. You can check which versions you are using with the below commands:

```
node -v
psql --version
```
