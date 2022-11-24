import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Styles from "./_profile.module.css";
import { database, auth } from "../apis/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { AuthContext } from "../apis/AuthContextApi";
import { async } from "@firebase/util";

const AddProfileData = () => {
  let { authUser } = useContext(AuthContext);
  let [state, setState] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    city: "",
    address: "",
    isLoading: false,
  });
  let { firstname, lastname, gender, city, address, isLoading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let payload = { firstname, lastname, gender, city, address };
      // !collection path
      let userCollectionRef = collection(database, "users");
      let { displayName, photoURL, uid, email, phonenumber } = authUser;
      await addDoc(userCollectionRef, {
        uid,
        displayName,
        photoURL,
        email,
        ...payload,
      });
      toast.success("users information is updated");
      window.location.assign("/profile");
      // !insert document into the collection
      // addDoc(userCollectionRef, payload);
      // console.log(authUser);
      // updateProfile(authUser, { ...payload });
    } catch (error) {
      toast.error(error.code);
    }
  };
  return (
    <div className={Styles.mainProfileBlock}>
      <h1>Add Profile</h1>
      <form className={Styles.profileForm} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">LastName</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <span>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="male"
              onChange={handleChange}
            />{" "}
            Male
          </span>
          <span>
            <input
              type="radio"
              name="gender"
              id="gender"
              value="female"
              onChange={handleChange}
            />{" "}
            Female
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" id={Styles.textarea}>
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProfileData;
