import firebase from 'firebase';
// import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCOi8PR4nEvj7xpZ6rsFgoXwIh3NexN3-8',
  authDomain: 'graphql-rules.firebaseapp.com',
  databaseURL: 'https://graphql-rules.firebaseio.com',
  projectId: 'graphql-rules',
  storageBucket: 'graphql-rules.appspot.com',
  messagingSenderId: '534762114781',
  appId: '1:534762114781:web:86367724c4fb9c93',
};

export default class Firebase {
  // store: (app?: firebase.app.App) => firebase.firestore.Firestore;
  database: (app?: firebase.app.App) => firebase.database.Database;
  auth: ((app?: firebase.app.App) => firebase.auth.Auth) & { GithubAuthProvider: any };

  constructor() {
    firebase.initializeApp(config);
    // this.store = firebase.firestore;
    this.database = firebase.database;
    this.auth = firebase.auth;
  }

  // get polls() {
  //   return this.store().collection('polls');
  // }
}
