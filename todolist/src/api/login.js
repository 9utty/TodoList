// src/api/auth.js

import axios from "axios";

export const loginAPI = (email, password) => {
  const API = "http://127.0.0.1:8000/auth/signin";

  return axios.post(
    API,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const SignUpAPI = (email, password) => {
  const API = "http://127.0.0.1/auth/signup";

  return axios.post(
    API,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
