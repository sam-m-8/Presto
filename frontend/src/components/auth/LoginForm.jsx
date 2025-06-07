import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_PORT } from "../../../backend.config.json";
import AuthInput from "./AuthInput";
import AuthLabel from "./AuthLabel";
import AuthFormSubmitButton from "./AuthFormSubmitButton";
import { Context, useContext } from "../../context";
import ErrorModal from "../template/ErrorModal";

const LoginForm = () => {
  const formStyle = "space-y-6";

  // error modal state handling
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const openErrorModal = (message) => {
    setErrorMsg(message); 
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();

    // verify the user's login details in the backend
    axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/login`, {
      email: email,
      password: password
    })
      .then((response) => {
        // retrieves token from the backend and sets it in the user's local storage and frontend store
        localStorage.setItem("token", response.data.token);
        setters.setToken(response.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        openErrorModal("Incorrect login details", err.message);
      });
  }

  return (
    <>
      <form className={formStyle} onSubmit={login}>
        <div>
          <AuthLabel htmlFor="login-email">Email address</AuthLabel>
          <AuthInput
            id="login-email"
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <AuthLabel htmlFor="login-password">Password</AuthLabel>
          <AuthInput
            id="login-password"
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <AuthFormSubmitButton>Log in</AuthFormSubmitButton>
      </form>
      <ErrorModal
        errorMsg={errorMsg} 
        isModalOpen={isErrorModalOpen} 
        closeModal={closeErrorModal} 
      />
    </>
  );
}

export default LoginForm;