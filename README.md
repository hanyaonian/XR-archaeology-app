# XR-archaeology

2023-2024 FYP in collaboration with Ararat Plain Southeast Archaeological Project

## Pre-requisites

- Run `yarn` for install packages (Node.js required, version < `18`).
- Enable developer mode and connect your tester device
  - [Android]: <https://developer.android.com/codelabs/basic-android-kotlin-compose-connect-device#0>.
  - [iOS]: <https://getupdraft.com/blog/how-enable-ios-developer-mode-iphone-or-ipad>.
- Create a `.env` file, including:

```txt
// your expo project appid
appid=xxxx
// for eas distribution
developer=xxx
// server api
EXPO_PUBLIC_API_URL
// for request routing
EXPO_PUBLIC_PREFIX
// system config
JAVA_HOME
```

Some documentation

- [integrating-with-expo](https://viro-community.readme.io/docs/integrating-with-expo)

## Development

### Quick Start

```sh
yarn 

yarn initapp

# for simulator, see
# https://docs.expo.dev/get-started/create-a-project/#open-the-app-on-your-device
# Depends on your development environment, run for running on your mobile.
yarn android
# or
yarn ios
```

### Android

- local apk

```sh
eas build -p android --profile preview --local
```

### IOS

- TODO

### Remarks

The app has been migrated from Realm api to our own [server and apis](https://github.com/Humen-debug/XR-archaeology-server/tree/main). Before running the app, please create a `.env` file and configure the server api uri as `EXPO_PUBLIC_API_URL`. After running the server, the connection uri should be your **hosting device ip with port _3002_**.

If you want to run the app with a data base that already had data, please contact @Humen-debug to get the public API url.

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

- Package version:
package: `expo-three-orbit-controls` on github is using outdated version of `three@0.108`. To solve the code conflict, an update is made by using `package-patch`.

- crashing:

working on it

- npx expo doctor errors:

1. error: Expected package @expo/config-plugins@~7.2.2, Found invalid: @expo/config-plugins@7.9.2

  in package.json

  ```json
    "resolutions": {
      "@viro-community/react-viro/@expo/config-plugins": "7.2.5"
    },
  ```
