import React, { useState } from "react";
import Styles from "./_auth.module.css";
import Auth_Image from "./assests/authimage.jpg"
import { toast } from "react-toastify";
import { auth } from "../../apis/firebase";
// !built in firebase function for authentication
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

const Register = () => {
    let navigate = useNavigate();
    let [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        isLoading:false
    })
    let { username, email, password, confirmpassword, isLoading } = state;
    let handleChange = e => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    let handleSubmit = async e => {
        e.preventDefault();
        try {
            if (password !== confirmpassword) {
                toast.error("password is not matched");
            } else {
              setState({ isLoading: true });
              let userData = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              sendEmailVerification(userData.user);
              let message = `Email verification mail has sent to ${email} address please verify...`;
              updateProfile(userData.user, {
                displayName: username,
                photoURL: `https://www.gravatar.com/avatar/${md5(email)}?q=identicon`,
              });
              toast.success(message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.code);
        }
        // !resetting form fields
        setState({
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            isLoading:false,
        });
    };
  return (
    <section id={Styles.authBlock}>
      <article>
        <div className={Styles.authLeft}>
          <h1>Register</h1>
          <figure>
            <img src={Auth_Image} alt="auth-image" />
          </figure>
        </div>
        <div className={Styles.authRight}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="enter username"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="enter email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="confirm password"
                value={confirmpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button>{isLoading === true ? "loading..." : "Register"}</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Register;
