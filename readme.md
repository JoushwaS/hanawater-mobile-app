Hana Water | 3 Oct 22

To run this application on QA please follow these steps :
=> src/config/api/config.js
=> comment out the UAT baseURL
=> umcomment the QA baseURL
=> Save the file

Hyperpay SDK 4.9
https://hyperpay-2020.sg3.quickconnect.to/d/f/722341666704373581

Development
- 3ds libarary non deploy naam ki lagani hai
- Hyperpay paymentProviderWithMode:OPPProviderModeTest is set
- merchant id merchant.com.sunbonn.hanaWater1 is set
- ipworks3ds_sdk.xcframework is added is frameworks folder ios
- change baseurl in api/config.js to developement

Production
- You make sure
- ipworks3ds_sdk_deploy.xcframework is added is frameworks folder ios
- Hyperpay paymentProviderWithMode:OPPProviderModeLive is set
- merchant id merchant.com.apps.hanawater is set
- change baseurl in api/config.js to production
- Update build number if you want to deploy on test flight


Create a build on iOS by XCode or typing the command : npm run ios
Create a build on Android by typing the command: npm run android

Please uninstall the old build from iOS device before installing the updated build. due to async storage.
Please clear the app data or uninstall the old build before installing the updated build.

Please do not make any other changes to config.js file.

Thank you.
