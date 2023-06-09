import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate, // useNavigate import 추가
} from "react-router-dom";
import { useState } from "react";
import AppLayout from "./AppLayout";
import { Button } from "react95";
import WindowIcon from "./WindowIcon";

const Home = () => {
  const navigate = useNavigate(); // useNavigate 사용

  const handleLoginClick = () => {
    navigate("/signin"); // 페이지 이동
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // 페이지 이동
  };
  return (
    <AppLayout
      Children={
        <div style={{ display: "flex" }}>
          <WindowIcon
            func={handleLoginClick}
            ImageUrl="https://user-images.githubusercontent.com/86397600/244757002-fd487db0-cc0d-4854-8e6c-f0fd1d1cee20.png"
            IconName="로그인."
          />
          <WindowIcon
            func={handleSignUpClick}
            ImageUrl="https://user-images.githubusercontent.com/86397600/244757628-cca27d46-1753-4095-b299-87bd6b0c813b.png"
            IconName="회원가입."
          />
        </div>
      }
    ></AppLayout>
  );
};

export default Home;
