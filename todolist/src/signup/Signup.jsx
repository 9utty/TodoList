import React, { useState } from "react";
import {
  TextField,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
} from "react95";
import MyModal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../api/login";
import AppLayout from "../components/AppLayout";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

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

  const handleSubmit = async (e) => {
    try {
      await SignUpAPI(email, password);
      // 성공 시 메인 페이지로 이동
      navigate("/signin", { replace: true });
    } catch (error) {
      alert("회원가입에 실패했습니다.");
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
              style={{
                justifyContent: "space-between",
                display: "flex",
                fontFamily: "dunggeunmo-bold",
                fontSize: "23px",
              }}
            >
              Sign Up
              <Button style={{ marginTop: "3px" }} onClick={close}>
                <span
                  style={{ fontFamily: "dunggeunmo-bold", fontSize: "20px" }}
                >
                  X
                </span>
              </Button>
            </WindowHeader>
            <WindowContent>
              <TextInput
                data-testid="email-input"
                style={{ fontFamily: "dunggeunmo-bold", marginBottom: 15 }}
                fullWidth
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextInput
                data-testid="password-input"
                fullWidth
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={{ fontFamily: "dunggeunmo-bold" }}
              />
              <div style={{ marginTop: 20 }}>
                <Button
                  data-testid="signup-button"
                  type="submit"
                  fullWidth
                  disabled={!isEmailValid || !isPasswordValid}
                  style={{ fontFamily: "dunggeunmo-bold" }}
                >
                  Submit
                </Button>
              </div>
            </WindowContent>
          </Window>
        </MyModal>
      }
    ></AppLayout>
  );
};

export default Signup;
