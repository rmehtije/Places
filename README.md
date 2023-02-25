# React-native app

## Local setup
Node -v: 18

1. git clone
1. delete .git
1. npm i
1. .env.example rename to .env
1. add your keys to .env
1. add google api key to /android/app/src/main/AndroidManifest.xml => meta-data android:name="com.google.android.geo.API_KEY"
1. app.js - search for 'com.uniq.places' and rename to something uniq like: 'com.ANY.places'
1. Install Expo Go on your android phone
1. run npx expo start

## Api & keys
1. register https://expo.dev/
1. create new project https://console.cloud.google.com/
1. Enable API services: 
    - Maps SDK for Android
    - Google Cloud API
    - Directions API
    - Google Maps for Android
1. Go to Credentials and make sure you have 'Maps API key'
1. whatch this video and create two OAuth credentials: https://youtu.be/MBMWiTsqnck?t=530