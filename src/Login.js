
import React from 'react'

import { FcGoogle } from "react-icons/fc"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from './App';
import { useNavigate } from "react-router-dom"
import { doc, setDoc, getFirestore } from "firebase/firestore";
import image from "./logo.jpg";
import { getDoc } from 'firebase/firestore';


function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("codepenuid") !== undefined) navigate("/", { replace: true });



  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider()

  const firebaseDB = getFirestore(firebaseApp);


  const signin = () => {




    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        const user = result.user;


        const uid = user.uid;





        if (user !== null) {
          localStorage.setItem("codepenuid", uid);
          const docRef = doc(firebaseDB, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {

          } else {
            await setDoc(doc(firebaseDB, 'users', uid), { html: "", css: "", js: "" });
          }


        }


        navigate("/", { replace: true });

      }).catch((error) => {

        console.log(error);

      });
  }


  return (


    <div style={{ display: 'flex', justifyContent: 'center', allignItems: 'center', width: '100vw', height: '100vh', position: 'relative' }}

    >

      <img src={image} style={{ objectFit: 'cover', width: "100vw", height: '100vh' }} />

      <div
        style={{ display: 'flex', justifyContent: 'center', allignItems: 'center', position: 'absolute' }}

      >
        <div>
          <button style={{ marginTop: "47vh", padding: '20px', justifyContent: 'center', allignItems: 'center', backgroundColor: "blueviolet", borderRadius: '20px', color: "white", fontSize: "30px", cursor: "pointer" }} onClick={signin}
          ><FcGoogle fontSize={25} />  Sign in with Google</button>
        </div>

      </div>
    </div>

  )
}

export default Login