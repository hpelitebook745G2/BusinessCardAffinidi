# BizLinkr

This React Native mobile application enables users to create, save, view, and delete business cards. The app allows users to export business cards as phone contacts.

## 🎉 Features
* Create a simple Business Card
* Save Business Card into a manageable list of cards
* View and delete an item
* Export Business Card as a Phone contact

## 🔧 Added Personal Improvements
* Added `star` or favorite functionality to the selected Business Card
* At the List screen, you can swipe the Business Card item to the left to delete without having to enter the Item screen
* Allowed users to edit Business Card details

## 🪪 Business Card Fields
A Business Card consists of the following fields:
* Name
* Occupation / Title
* Company
* Email Address
* Phone Number
* LinkedIn URL (optional)

## 🛠️ Pre-requisites

Install these tools

-   Git
-   NodeJS v18
-   Xcode v14
-   Android Studio 2022
-   Homebrew 3.6.20++
-   Cocoapods 1.11.2
-   OpenJDK 11

## How to run via React Native
###  iOS

#### Install dependencies

1. `yarn`
2. `npx pod-install`

#### Compile the code and deploy to simulator

-   `yarn ios` it should automatically open metro bundler and simulator consecutively

### 🤖 Android

#### Install dependencies

1. `yarn`

#### Start the bundler, run the code and deploy to emulator

-   `yarn android` it should automatically open metro bundler and simulator consecutively

## 💻 Technology Stack
This mobile application is built using the following technologies:
* React Native
* TypeScript
* JavaScript
* Redux
* Redux Toolkit
* Redux Persist
* React Navigation
* AsyncStorage
* Lottie
* React Native Contacts
