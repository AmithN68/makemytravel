import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from "./_profile.module.css";

const ProfileSidebar = () => {
  return (
    <div className={Styles.sidebarProfile}>
      <nav>
        <ul>
          <li>
            <NavLink to="/Profile" activeclassname="active">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Profile/upload-profile-photo"
              activeclassname="active"
            >
              Update profile photo
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/update-phone" activeclassname="active">
              Update phone number
            </NavLink>
          </li> */}
          <li>
            <NavLink to='/Profile/add-profile-data' activeclassname="active">
              Add Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ProfileSidebar