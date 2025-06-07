const AuthFormSubmitButton = ({ children }) => {
  const loginButtonStyle = `flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;
  const containerStyle = `pt-3`;

  return (
    <>
      <div className={containerStyle}>
        <button
          type="submit"
          className={loginButtonStyle}
        >
          {children}
        </button>
      </div>
    </>
  );
}

export default AuthFormSubmitButton;