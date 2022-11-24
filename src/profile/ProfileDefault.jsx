import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../apis/AuthContextApi";
import Spinner from "../pages/Spinner";
import Styles from "./_profile.module.css";
import { FaCamera } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../apis/firebase";

const ProfileDefault = () => {
  let { authUser } = useContext(AuthContext);
  let [profile, setProfile] = useState("");
  let userCollectionRef = collection(database, "users");
  let fetchData = async () => {
    let data = await getDocs(userCollectionRef);
    data.docs.map(user => {
      return setProfile(user.data());
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={Styles.mainProfileBlock}>
      {authUser === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Profile</h1>
          <article>
            <aside className={Styles.asideIcon}>
              <Link to="/Profile/upload-profile-photo">
                <figure>
                  <img src={authUser.photoURL} alt={authUser.displayName} />
                </figure>
                <main>
                  <span className={Styles.icons}>
                    <FaCamera />
                  </span>
                </main>
              </Link>
            </aside>
            <footer>
              <h1>{authUser.displayName}</h1>
              <h4>{authUser.email}</h4>
            </footer>
            <aside className={Styles.profileUser}>
              <Fragment>
                <p>{profile.gender}</p>
                <p>{profile.city}</p>
                <p>{profile.address}</p>
              </Fragment>
            </aside>
          </article>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileDefault;
