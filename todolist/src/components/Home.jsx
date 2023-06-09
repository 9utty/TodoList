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
        <div>
          <Button onClick={handleLoginClick}>로그인</Button>
          <Button onClick={handleSignUpClick}>회원가입</Button>
        </div>
      }
    ></AppLayout>
  );
};

export default Home;
