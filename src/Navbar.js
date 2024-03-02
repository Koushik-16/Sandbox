import React, { useContext } from 'react'
import { signOut, getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import profile from "./profile.webp"


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  function logout() {

    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
    });

  }

  return (
    <div style={{ backgroundColor: "black", display: 'flex', alignItems: "center", justifyContent: "space-between", height: '35px' }}>
      <img src={currentUser.photoURL} alt={profile} style={{ height: "35px", borderRadius: "50%" }} />

      <Link to={"/login"} onClick={logout}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: "10%", textDecoration: "none", backgroundColor: "lightblue", padding: "2px", borderRadius: '15px'
        }}>Logout</Link></div>
  )
}

export default Navbar