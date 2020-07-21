<div align="center">
<h1>Reclaimed App</h1>

<img src="https://candeecamp.blob.core.windows.net/images/logo-colored.png" style="max-width: 300px;" />

<h3>Personalized Software for your Camp!</h3>
</div>

<hr />

## Build Status

### JS Build Status

[![JS Build Status](https://dev.azure.com/candeegenerations/Candee%20Camp/_apis/build/status/Candee%20Camp%20JS%20Build?branchName=master)](https://dev.azure.com/candeegenerations/Candee%20Camp/_build/latest?definitionId=14&branchName=master)

### API Build Status

[![API Build Status](https://dev.azure.com/candeegenerations/Candee%20Camp/_apis/build/status/Candee%20Camp%20API%20Build?branchName=master)](https://dev.azure.com/candeegenerations/Candee%20Camp/_build/latest?definitionId=15&branchName=master)

## Description

Reclaimed is an app for your camp! Manage everything from events, to campers, to cabins in Reclaimed.

This project is built with React and .NET Core.

## Setup

- Open new terminal to the project root.
- Run the following command:

`$ yarn bootstrap`

The packages will be installed. Use the following commands to start the projects:

**app**

`> cd app && yarn start`

### ENV file

You will need to setup a `.env` file for the app to work correctly.
You can create it in `/app/.env` and the contents will look similar to this:

```

PORT=3300
BROWSER=none

REACT_APP_VERSION=$npm_package_version
REACT_APP_URL=http://localhost:3300
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CRYPTO_KEY=a9f3cd176403126642c142605ef08829

REACT_APP_CLIENT_SECRET=7HVtapegk2LM9oXIWEnOvBhcYfCbyJ
REACT_APP_CLIENT_NAME=registrations_local

REACT_APP_PAYPAL_SCRIPT_URL=https://www.paypal.com/sdk/js?client-id=

REACT_APP_LOADING_BAR_ENABLED=false

```
