<div align="center">
<h1>Candee Camp</h1>

<img src="https://emojipedia-us.s3.amazonaws.com/thumbs/320/apple/129/camping_1f3d5.png" style="max-width: 96px;" />

<h3>Church camp system.</h3>
</div>

<hr />

## Build Status

### JS Build Status
[![JS Build Status](https://dev.azure.com/candeegenerations/Candee%20Camp/_apis/build/status/Candee%20Camp%20JS%20Build?branchName=master)](https://dev.azure.com/candeegenerations/Candee%20Camp/_build/latest?definitionId=14&branchName=master)

### API Build Status
[![API Build Status](https://dev.azure.com/candeegenerations/Candee%20Camp/_apis/build/status/Candee%20Camp%20API%20Build?branchName=master)](https://dev.azure.com/candeegenerations/Candee%20Camp/_build/latest?definitionId=15&branchName=master)

## Description

This system is built to help church camps better manage
their camps, events, campers, registrations, etc.

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
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CRYPTO_KEY=a9f3cd176403126642c142605ef08829

REACT_APP_LOADING_BAR_ENABLED=false

```

## Contributors

Thanks goes to these people:

| [<img src="https://avatars2.githubusercontent.com/u/39174127" width="100px;"/><br /><sub><b>Tyler Candee</b></sub>](https://candeegenerations.com)<br />[💻](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Code") [📖](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Documentation") [⚠️](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Tests") | [<img src="https://avatars2.githubusercontent.com/u/10689559" width="100px;"/><br /><sub><b>Glenn Stegall</b></sub>](http://github.com/darklordimperatus)<br />[💻](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Code") [📖](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Documentation") [⚠️](https://github.com/candeegenerations/candee-camp-fe/commits?author=cgen01 "Tests") |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

