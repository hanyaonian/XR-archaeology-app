# XR-archaeology

2023-2024 FYP in collaboration with Ararat Plain Southeast Archaeological Project

## Pre-requisites

This project uses Expo for React Native. Ensure your node version is lower than 17 because the Expo Cli in this project does not support Node version 17+. You can use [Node Version Manager (nvm)](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/). To use the packages provided by Expo, please install them by running `yarn`.

For better type annotation, typescript is recommended.

## To begin the app [DEV]

- Run `nvm use 16.xx.x` for node version configuration, if your current node version is larger or equal to 17.
- Run `yarn` for install packages.
- Enable developer mode and connect your tester device
  - [Android]: <https://developer.android.com/codelabs/basic-android-kotlin-compose-connect-device#0>.
  - [iOS]: <https://getupdraft.com/blog/how-enable-ios-developer-mode-iphone-or-ipad>.
- Create a `.env` file, including:
  - `appid`, `developer`, `slug` for expo`s app.json
  - `EXPO_PUBLIC_API_URL`, `EXPO_PUBLIC_PREFIX` are for server connection (see remarks)

    ```text
    appid=xxxx
    developer=xxx
    slug=xxx

    EXPO_PUBLIC_API_URL=xxx
    EXPO_PUBLIC_PREFIX=xxx
    ```

Some documentation

- [integrating-with-expo](https://viro-community.readme.io/docs/integrating-with-expo)

## Development

### Quick Start

```sh
yarn 

# init expo app.json
yarn initapp

yarn android
```

### IOS

IOS simulator development is not supported because the AR function.

### Android

Andorid simulator development is not supported because the AR function.

- build a standalone apk

```sh
# build a package via expo internal distribution
yarn build:android

# in local
eas build -p android --profile preview --local
```

### Remarks

- The app has been migrated from Realm api to our own [server and apis](https://github.com/Humen-debug/XR-archaeology-server/tree/main). Before running the app, please create a `.env` file and configure the server api uri as `EXPO_PUBLIC_API_URL`. After running the server, the connection uri should be your **hosting device ip with port _3002_**.

- `yarn start` has been duplicated by the `yarn android` and `yarn ios` because ViroReact does not support Expo Go client.

- if you are developing using Android, after running `yarn clean`, please rollback the Android Linking of ViroReact in `android` directory, by the [ViroReact Installation Instructions](https://viro-community.readme.io/docs/installation-instructions), or using source controls in Git to revert the changes in `android` directory.

- using http request in standalone app, use [usesCleartextTraffic](https://docs.expo.dev/versions/latest/sdk/build-properties/) in eas.json, but it's not recommended

## Folder structure

- app: stores all the pages for front-end.
  - (tabs): contains pages having the bottom navigation bar.
    - \_layout: stores the navigation bar layout.
    - home: Home Page shows the collections of items.
    - profile: User account and settings
  - \_layout: root stack/layout router
- assets: stores static assets, mainly images
- components: our customized components/widgets.
- models: the mongodb database schema or classes
- providers: our customized react contexts
- styles: app theme styles
- types: declared or modified types in other packages
- package.json: libraries

## Issues

- package: `expo-three-orbit-controls` on github is using outdated version of `three@0.108`. To solve the code conflict, an update is made by using `package-patch`.

- If you want to run the app with a database that already had official data, please contact @Humen-debug to get the public API url.
