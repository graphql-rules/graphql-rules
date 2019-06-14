import React from 'react';
import Firebase from './firebase';

interface Props {
  children?: React.ReactNode;
  firebase: Firebase;
}

class FirebaseProvider extends React.Component<Props> {
  static propTypes = {};

  static childContextTypes = {
    firebase: () => null,
  };

  getChildContext() {
    const { firebase } = this.props;
    return {
      firebase,
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default FirebaseProvider;
