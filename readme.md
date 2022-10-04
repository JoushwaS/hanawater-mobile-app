Hana Water | 3 Oct 22

To run this application on QA please follow these steps :
=> src/config/api/config.js
=> comment out the UAT baseURL
=> umcomment the QA baseURL
=> Save the file

Create a build on iOS by XCode or typing the command : npm run ios
Create a build on Android by typing the command: npm run android

Please uninstall the old build from iOS device before installing the updated build. due to async storage.
Please clear the app data or uninstall the old build before installing the updated build.

Please do not make any other changes to config.js file.

Thank you.
