import axios from "axios";
import { message } from "antd";



export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.post(
      '/api/user/login',
      reqObj
    );
    const { admin, username, _id } = res.data;
    localStorage.setItem("user", JSON.stringify({ admin, username, _id }));
    message.success("Login success");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  
  } catch (error) {
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post('/api/user/register',
      reqObj
    );
    message.success("Registration successfull");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};