const AuthInput = ({ id, type, name, value, onChange }) => {

  const inputStyle = 'block w-full rounded-md border-1 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600';
  const containerStyle = "mt-2";

  return (
    <>
      <div className={containerStyle}>
        <input
          className={inputStyle}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}

export default AuthInput;