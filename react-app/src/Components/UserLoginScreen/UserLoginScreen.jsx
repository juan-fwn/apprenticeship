import React from "react";

import styles from "./UserLoginScreen.module.css";

import movy from "../../assets/movy.svg";
import facebookLogo from "../../assets/facebookLogo.svg";
import login from "../../images/login.png";

import Footer from "../UI/Footer";

import useRequest from "../../hooks/useRequest";

function UserLoginScreen() {
  const { sendRequest } = useRequest();

  const onClickLogInHandler = () => {
    const requestConfig = {
      path: "/authentication/token/new?",
    };

    const applyData = (data) => {
      console.log({ data });

      if (data && data.success) {
        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/`;
      }
    };

    sendRequest(requestConfig, applyData);
  };

  return (
    <>
      <div className={`${styles.shadows}`}>
        <img
          src={login}
          alt="Background"
          className="absolute -z-10 max-h-screen w-screen"
        />
        <nav className="flex items-center sm:ml-24 ml-2 sm:mr-14 mr-2 sm:pt-10 pt-6">
          <img src={movy} alt="Movy Logo" />
          <button type="button" className="text-white ml-auto mr-8">
            Register
          </button>
          <button
            type="button"
            className="bg-[#0578FF] px-8 py-2 rounded-lg text-white hover:bg-[#2387fa]"
          >
            Login
          </button>
        </nav>
        <div className="max-w-[440px] h-[517px] mx-auto sm:mt-20 mt-14 bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-center rounded-md">
          <p className="text-white sm:text-4xl text-3xl">Inicia sesión</p>
          <button
            type="button"
            onClick={onClickLogInHandler}
            className="w-[341px] h-[45px] bg-[#0578FF] text-white rounded-sm my-12 hover:bg-[#2387fa]"
          >
            Iniciar sesión
          </button>
          <div className="flex">
            <img src={facebookLogo} alt="Facebook" />
            <p className="text-white text-sm ml-2">
              Iniciar sesión con Facebook
            </p>
          </div>
          <p className="text-white text-sm mt-8">
            ¿Primera vez en Movy?&nbsp;
            <strong>Suscribite ya.</strong>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserLoginScreen;
