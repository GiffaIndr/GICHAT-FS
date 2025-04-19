import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import Channel from "./components/Channel";

firebase.initializeApp({
  apiKey: "AIzaSyAL5i8weQ1p_haYgNnDknBR50q2HiWNieI",
  authDomain: "gichat-24b31.firebaseapp.com",
  projectId: "gichat-24b31",
  storageBucket: "gichat-24b31.appspot.com",
  messagingSenderId: "357539530270",
  appId: "1:357539530270:web:d24eb880784961c99c500f",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user || null);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "loading....";

  return (
    <>
      {user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          <p>Welcome to the chat</p>
          <Channel user={user} db={db} /> 
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </>
  );
}

export default App;
