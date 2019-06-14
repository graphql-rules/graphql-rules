import React from 'react';
import Firebase from '../services/firebase';

interface Props {
  children: (meta: {
    signIn: (provider: 'github' | 'anonymous') => any;
    signOut: () => any;
    isAuthed: boolean;
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
  }) => React.ReactNode;
}

interface State {
  uid: string;
  isAnonymous: boolean | null;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

const INITIAL_STATE: State = {
  uid: '',
  isAnonymous: null,
  // // some other properties from the user object that may be useful
  // email: '',
  // displayName: '',
  // photoURL: '',
};

class Auth extends React.Component<Props, State> {
  static contextTypes = {
    firebase: () => null,
  };

  state = INITIAL_STATE;

  componentDidMount() {
    const { auth } = this.context.firebase as Firebase;
    // onAuthStateChanged returns an unsubscribe method
    this.stopAuthListener = auth().onAuthStateChanged((user) => {
      if (user) {
        // if user exists sign-in!
        this.signIn(user);
      } else {
        // otherwise sign-out!
        this.signOut();
      }
    });
  }

  componentWillUnmount() {
    this.stopAuthListener();
  }

  stopAuthListener = () => {};

  handleSignIn = (provider = 'github') => {
    const { auth } = this.context.firebase as Firebase;

    switch (provider) {
      // the auth listener will handle the success cases
      case 'github':
        return auth()
          .signInWithPopup(new auth.GithubAuthProvider())
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
            // TODO: notify the user of the error
            return error;
          });

      case 'anonymous':
        return auth()
          .signInAnonymously()
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
            // TODO: notify the user of the error
            return error;
          });

      default:
        const reason = 'Invalid provider passed to signIn method';
        // eslint-disable-next-line no-console
        console.error(reason);
        return Promise.reject(reason);
    }
  };

  handleSignOut = () => {
    const { auth } = this.context.firebase;

    return auth().signOut();
  };

  signIn(user: firebase.User) {
    const { uid, isAnonymous, displayName, email, photoURL } = user;

    console.log(user.getIdTokenResult());

    console.log(this.context.firebase.auth().getRedirectResult());

    this.setState({
      uid,
      isAnonymous,
      displayName,
      email,
      photoURL,
    });
  }

  signOut() {
    this.setState(INITIAL_STATE);
  }

  render() {
    // If uid doesn't exist in state, the user is not signed in.
    // A uid will exist if the user is signed in anonymously.
    // We'll consider anonymous users as unauthed for this variable.
    const isAuthed = !!(this.state.uid && !this.state.isAnonymous);

    return this.props.children({
      ...this.state,
      signIn: this.handleSignIn,
      signOut: this.handleSignOut,
      isAuthed,
    });
  }
}

export default Auth;
