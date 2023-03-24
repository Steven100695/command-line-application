# Phone Search Command Line Application

This is a command-line application that allows users to search for phone brands and models. This Command Line Application demonstrates our understanding of JavaScript and Node.js by building a CLI that searches for phone by brands and models.

## Authors

- Steven Wang
- Kyle Vo
- Dipali Makadia

## Installation

To install the application, clone this repository and run the following command in the terminal:

```
    npm install
```

This will install all the necessary dependencies.

## Usage

To use the application, run the following command in the terminal:

```
    node cli.js <type> <name>
```

Run the application using the command: node cli.js <type> <name>

- The `type` argument can be either `brand` or `name`.
- The `name` argument is the name of the brand or phone model you want to search for.

For example:

```
    node cli.js search brand samsung
```

This will search for all phone models from the brand samsung.

## Features

The Phone Search Command Line Application allows users to:

- Search for phone brands and models.
- View the search history.
- Save the search history to a JSON file.
- Display phone specifications detail.

## Technologies

The following technologies were used to build this application:

- JavaScript
- Node.js

## Dependencies

The Phone Search Command Line Application uses the following dependencies:

- `fs.promises` - Node.js file system module with Promise-based API.
- `superagent` - Library for making HTTP requests.
- `prompts` - Lightweight prompt library for Node.js.
- `yargs` - Command-line parser for Node.js.

Additionally, the application uses the [Phone Specs API](https://github.com/azharimm/phone-specs-api) for retrieving phone specifications, a free and open-source API that provides comprehensive and up-to-date information on various phone models. We are grateful to the developers who created and maintain this API.
