import React, { Component } from "react";
import ContentLoginRegister from "./content.login.register";

const Home = ({
  setEmailogin,
  setPasswordlogin,
  setEmail,
  setPassword,
  setConfirm,
  notificationRegister,
  notificationLogin,
  registerSubmit,
  loginSubmit,
}) => (
  <div>
    <ContentLoginRegister
      setEmailogin={(value) => setEmailogin(value)}
      setPasswordlogin={(value) => setPasswordlogin(value)}
      setEmail={(value) => setEmail(value)}
      setPassword={(value) => setPassword(value)}
      setConfirm={(value) => setConfirm(value)}
      notificationRegister={notificationRegister}
      notificationLogin={notificationLogin}
      registerSubmit={() => registerSubmit()}
      loginSubmit={() => loginSubmit()}
    />
  </div>
);

export default Home;
