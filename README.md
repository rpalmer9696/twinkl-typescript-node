# Twinkl TypeScript Tech Test

This is a simple API, written in Typescript, that makes use of Express for routing, Drizzle ORM for database management, and Jest for tests.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.

## Set up

Navigate to the directory:

```
cd twinkl-typescript-node
```

Install the dependencies:

```
npm i
```

Start application and generate database:

```
npm run dev
```

Run migrations:

```
npm run migrate:apply
```

## Environment Variables

- PORT - The port for the API to run on.
- DB_NAME - The name that Drizzle will use to connect to the database to create and update it.

## Structure

The API is split into 3 separate layers: Route layer, Library layer, and Database layer

### Route Layer

This is where the routing logic is handled, it is split up into separate files for each resource type so that it can be easily extended when further resources are added.
This should only contain logic related to routing such as express router setup, middleware, and response formatting.
This project uses express for routing.

### Library Layer

This is where the business logic of the API is located. There is a separate file for each resource. Any logic relating to business rules, such as data tranformation, should be done at this layer.
The functions in this layer are wrapped in a function to allow the database functions to be injected in, which allows for the library and database layers to be independent and ease of testing.

### Database Layer

This is where the code that interacts with the database is. There should be no logic in this layer except database queries, it should be kept as simple as possible.
This project uses Drizzle ORM with an SQLite database, as such the schema is created as typescript code, this can be found in `src/db/schema.ts`. When making a change to the schema here then a migration has to be generated using the `npm run migrate:generate` command followed by `npm run migrate:apply` to update the database.

## Tests

There are a mix of integration and unit tests found in the tests/ directory.

- Integration tests cover each endpoint and mock the db layer to ensure no testing data gets added to the system.
- Unit tests cover the library layer and middleware in the route layer.

  - This is where the majority of the logic for the application lives.
  - The routes and db layer are not included in the unit tests as these layers interact directly with packages as such we would need to mock quite complex objects.

  To run the tests:

  ```
  npm test
  ```

## Improvements

- Ensure emails are unique in the DB.
- Change the DB to use a pool.
