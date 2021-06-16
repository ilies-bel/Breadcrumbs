import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {CONFIRMATION_EMAIL_REDIRECT} from '../../constants/settings';

const config = {
  apiKey: 'AIzaSyAMnXyVy7CnvEROiTaRJgTsVmc0EJBJLbI',
  authDomain: 'breadcrumbs-de87d.firebaseapp.com',
  databaseURL: 'https://breadcrumbs-de87d-default-rtdb.firebaseio.com',
  projectId: 'breadcrumbs-de87d',
  storageBucket: 'breadcrumbs-de87d.appspot.com',
  messagingSenderId: '856216416979',
  appId: '1:856216416979:web:5d776e2f0f8b5059f4da26',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({ url: CONFIRMATION_EMAIL_REDIRECT });

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then((snapshot) => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
