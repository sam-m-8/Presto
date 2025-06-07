import potionIcon from "../../assets/potion-icon.svg";

const AuthFormHeader = ({ children }) => {
  const headerContainerStyle = `sm:mx-auto sm:w-full sm:max-w-sm`;
  const logoStyle = `mx-auto h-20 w-auto`;
  const headerStyle = `mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900`;

  return (
    <div className={headerContainerStyle}>
      <img className={logoStyle} src={potionIcon} alt="Presto logo" />
      <h2 className={headerStyle}>{children}</h2>
    </div>
  )
}

export default AuthFormHeader;