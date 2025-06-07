import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_PORT } from "../../../backend.config.json";
import AuthInput from "./AuthInput";
import AuthLabel from "./AuthLabel";
import axios from "axios";
import AuthFormSubmitButton from "./AuthFormSubmitButton";
import { Context, useContext } from "../../context";
import ErrorModal from "../template/ErrorModal";

const RegisterForm = () => {
  const formStyle = "space-y-4";

  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const openErrorModal = (message) => {
    setErrorMsg(message); 
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      openErrorModal("Passwords do not match");

    } else {
      // add user's details to the backend 
      axios.post(`http://localhost:${BACKEND_PORT}/admin/auth/register`, {
        email: email,
        password: password,
        name: name
      })
        .then((response) => {
          // retrieve token from the backend and set local storage and frontend store and redirect user
          // to their dashboard
          localStorage.setItem("token", response.data.token);
          setters.setToken(response.data.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          openErrorModal(err.message);
        });
    }
  }

  return (
    <>
      <form className={formStyle} onSubmit={registerUser}>
        <div>
          <AuthLabel htmlFor="register-name">Name</AuthLabel>
          <AuthInput
            type="text"
            id="register-name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <AuthLabel htmlFor="register-email">Email</AuthLabel>
          <AuthInput
            id="register-email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <AuthLabel htmlFor="register-password">Password</AuthLabel>
          <AuthInput
            id="register-password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <AuthLabel htmlFor="register-confirm-password">Confirm Password</AuthLabel>
          <AuthInput
            id="register-confirm-password"
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <AuthFormSubmitButton>Register</AuthFormSubmitButton>
      </form>
      <ErrorModal
        errorMsg={errorMsg} 
        isModalOpen={isErrorModalOpen} 
        closeModal={closeErrorModal} 
      />
    </>
  );
}

export default RegisterForm;