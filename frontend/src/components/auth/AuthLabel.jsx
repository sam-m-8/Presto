const AuthLabel = ({ htmlFor, children }) => {
  const labelStyle = `block text-base font-medium text-gray-900`;

  return (
    <>
      <label
        className={labelStyle}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    </>
  );
}

export default AuthLabel;