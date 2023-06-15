# Angular Credit Card Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.
- Angular
- Angular Fire
- Firestore
- Netlify
- Bootswatch
- Toastr

## Get Started

### Install dependencies with yarn
```
yarn install
```
Or just run
```
yarn
```
### Firebase Credentials
This project uses [FireStore Firebase](https://firebase.google.com/docs/firestore?hl=es-419) and [AngularFire](https://github.com/angular/angularfire). Well, you need to follow this [guide](https://firebase.google.com/docs/firestore/quickstart#create) to set up a project in Firebase Console, enable Cloud Firestore and get your credentials.
After this, you need to fill your credentials in a .env file like [.env-example](https://github.com/ulysses-ck/angular-credit-card-manager/blob/main/.env-example). Once this is done, the file setEnv.ts ensure create a directory with the credentials ready to use running the next command:
```
ng start
```
### Build to production
Make sure you have written your environment variables in the hosting platform.

```
ng build --configuration production
```
