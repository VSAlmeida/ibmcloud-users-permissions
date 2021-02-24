# IBM Cloud Users Permissions

![GitHub repo size](https://img.shields.io/github/repo-size/vsalmeida/ibmcloud-users-permissions)
![GitHub top language](https://img.shields.io/github/languages/top/vsalmeida/ibmcloud-users-permissions)
![GitHub last commit](https://img.shields.io/github/last-commit/vsalmeida/ibmcloud-users-permissions)
![License](https://img.shields.io/github/license/vsalmeida/ibmcloud-users-permissions)

Simple script to get users and their permissions from an IBM Cloud account

## Table of contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting API Username](#getting-api-username)
- [Getting API Key](#getting-api-key)
- [Usage](#usage)
- [Contributing](#contributing)

## Prerequisites

To run this project you need to have installed

- [IBM Cloud Account ID](#getting-account-id)
- [IBM Cloud API Username](#getting-api-username)
- [IBM Cloud Classic API Key](#getting-classic-api-key)
- [IBM Cloud API Key](#getting-api-key)
- [NodeJS](https://nodejs.org/en/download/)

## Installation

First you need to clone this repository

```bash
git clone https://github.com/VSAlmeida/ibmcloud-users-permissions
```

After that use the [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install) package manager to install the dependencies

```bash
npm install or yarn install
```

## Getting Account ID

- In the manage menu, click on Account
- In the side menu, select Account settings
- Copy the ID

## Getting API Username

- In the manage menu, click on Access(IAM)
- In the side menu, select Users
- Select your user
- Scroll down to the "VPN Password" section
- Copy the username for this session. Usually it will be the user's account number + "\_" + email. <br>Example: 1234567_example@example.com

## Getting Classic API Key

- In the manage menu, click on Access(IAM)
- In the side menu, select Users
- Select your user
- Scroll down to the "API keys" section
- Click on "Create classic infrastructure key" and copy it

## Getting API Key

- In the manage menu, click on Access(IAM)
- In the side menu, select Users
- Select your user
- Scroll down to the "API keys" section
- Click on "Create an IBM Cloud API key" and copy it

## Usage

After you have done the [installation](#installation) open the terminal in the directory where you cloned the project and run

```bash
npm start or yarn start
```

### Nice Tip

Every time you start the application, it asks for your credentials. In case you didn't want to repeat this process every time, you can create a file with the name **.env** in the project's root folder with the following specifications

```.env
ACCOUNT_ID=Your_Account_ID
USER_NAME=Your_API_Username
API_KEY=Your_API_Key
CLASSIC_API_KEY=Your_Classic_API_Key
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
