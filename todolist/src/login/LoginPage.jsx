import React, { useState } from "react";
import {
  TextField,
  Button,
  Window,
  WindowHeader,
  WindowContent,
} from "react95";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api/login";
import AppLayout from "../components/AppLayout";
import MyModal from "../components/Modal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사 함수 (예: 최소 8자, 최소 하나의 대문자와 소문자, 최소 하나의 숫자)
  const validatePassword = (password) => {
    const passwordRegex = /^\S{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const tmp = e.target.value;
    setEmail(tmp);
    setIsEmailValid(validateEmail(tmp));
  };

  const handlePasswordChange = (e) => {
    const tmp = e.target.value;
    setPassword(tmp);
    setIsPasswordValid(validatePassword(tmp));
  };

  const handleSubmit = async () => {
    try {
      const res = await loginAPI(email, password);
      localStorage.setItem("accessToken", res.data.access_token);
      navigate("/todo", { replace: true });
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.error(error);
    }
  };
  const close = () => {
    navigate(-1);
  };

  return (
    <AppLayout
      Children={
        <MyModal>
          <Window style={{ width: 300 }}>
            <WindowHeader
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              Sign In
              <Button style={{ marginTop: "3px" }} onClick={close}>
                <span
                  style={{ fontFamily: "dunggeunmo-bold", fontSize: "20px" }}
                >
                  X
                </span>
              </Button>
            </WindowHeader>
            <WindowContent>
              <TextField
                data-testid="email-input"
                style={{ marginBottom: 15 }}
                fullWidth
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                data-testid="password-input"
                fullWidth
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div style={{ marginTop: 20 }}>
                <Button
                  data-testid="signin-button"
                  type="submit"
                  fullWidth
                  disabled={!isEmailValid || !isPasswordValid}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>
            </WindowContent>
          </Window>
        </MyModal>
      }
    ></AppLayout>
  );
};

export default LoginPage;
