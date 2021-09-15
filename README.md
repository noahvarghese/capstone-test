# OnBoard - Test

## About

This is my capstone project for college.
I have seperated it out into 3 repositories so as to prevent a clutter of files.

[capstone-client, capstone-server, capstone-test]

The client and server are the frontend and backend respectively,
and each may hold some unit tests solely applicable to the scope of that component.

Any tests involving both the frontend and the backend will be located in the tests repo.

Documentation - mockups, ERD, class diagrams are currently in my private DropBox.

They may be moved into their own repo at the end of this to showcase all parts of this project.

## Areas of Focus

-   Test Automation
-   BDD
-   Cucumber
-   Selenium
-   CI/CD
-   GitHub Actions

## What it does

This will be used to test against the production environment hosted on an EC2 instance.
Ideally this would run on a qa environment triggered by a push to qa, and then on success a push to production would be triggered.

## Ideal Application development flow (applies to both capstone-client and capstone-server)

1. Pull Request to develop
2. CI is run
3. Pull request is approved
4. CI and CD is run
5. Pushes to QA
5. A job is triggered to execute this test against QA
6. After success, trigger a push from develop to main
7. Run CI and CD for main

### Notes

develop branches should require a pull request
push to main should be done by a special account that only it and the repository owner can commit to

## Environment

-   Env variables must be loaded into the Elastic Beanstalk (I believe)
-   Environment variables for the test cases must be passed via the environment variables in the build stage
