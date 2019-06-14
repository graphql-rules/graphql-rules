import React from 'react';
import FirebaseProvider from './src/services/FirebaseProvider';
import Firebase from './src/services/firebase';

export default ({ element }) => {
  const firebase = new Firebase();

  return <FirebaseProvider firebase={firebase}>{element}</FirebaseProvider>;
};
