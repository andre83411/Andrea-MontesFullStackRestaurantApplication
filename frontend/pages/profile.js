import React, { useContext, useEffect } from "react";
import Profile from "@/components/Profile";
import { useAppContext } from "../context/AppContext"

const ProfilePage = () => {
  const { isLoggedIn, login } = useAppContext();

  useEffect(() => {
    if (isLoggedIn) {
      // Trigger login function to simulate user login
      login();
    }
  }, [isLoggedIn, login]);

  return (
    <div className="w-96 m-8 rounded-2xl">
      <Profile style={{ margin: "0 10px" }} />
    </div>
  );
};

export default ProfilePage;
