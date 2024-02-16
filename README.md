# CognitoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Before You Start

Please note that this project is currently a Proof of Concept (POC) and utilizes the `src\aws-exports.tss` file for configuration. For the sake of simplicity and focus on the core functionality, we store sensitive information like the Google Client ID and AWS Cognito details directly in this file.

Here is how you should structure your file:

```
const awsmobile = {
  Auth: {
    region: 'us-east-1', // Your Cognito User Pool region
    userPoolId: 'xxxxxxxx', // Your Cognito User Pool ID
    userPoolWebClientId: 'xxxxxxxx', // Your Cognito App Client ID
  },
};

export default awsmobile;
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
