import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import React, {  useState, useEffect } from 'react';

// LoginSuccessful is a function sent in by parent component
function LoginForm({LoginEvent}) {
    const firebaseConfig = {
            apiKey: "AIzaSyC1OuFQ1PXGp5zxyJtZbHcAbHTQNsZSsbQ",
            authDomain: "project4loginwof.firebaseapp.com",
            projectId: "project4loginwof",
            storageBucket: "project4loginwof.appspot.com",
            messagingSenderId: "816261632185",
            appId: "1:816261632185:web:b0a58e6c6ce95e761dcb68",
            measurementId: "G-56H66KF08W"
      };

	initializeApp(firebaseConfig);

	const [loggedUser, setLoggedUser] = useState('');

	// function to sign in with Google's page
	const signInWithGoogle = () => {

  		const provider = new GoogleAuthProvider();
  		const auth = getAuth();
  		signInWithRedirect(auth, provider)
    	.then((result) => {
      		// User signed in
      		console.log(result.user);
      		setLoggedUser(result.user)

    	}).catch((error) => {
      	// Handle Errors here.
      		console.error(error);
    	});
	};

	// function to sign out
	function logoutGoogle () {
		const auth=getAuth();
		auth.signOut();
		setLoggedUser(null)
	}

	useEffect(() => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // ユーザーがサインインした場合、この部分が実行されます
          console.log(user);
          setLoggedUser(user);
          LoginEvent(user); // 親コンポーネントにユーザー情報を渡します
        }
      });

      // コンポーネントのアンマウント時にリスナーを解除します
      return () => unsubscribe();
    }, []);



	// note the ? to show either login or logout button
	return (
    <div >
    {loggedUser?
      <><p>user: {loggedUser.uid}</p> <button onClick={logoutGoogle}>Log out</button> </>
      :<button onClick={signInWithGoogle}>Sign in with Google</button>
    }

    </div>
  );

}
export default LoginForm;