import { Link } from "react-router-dom";

const AuthBodyCard = ({ FormComponent, formProps, message, linkLabel, linkPath }) => {
  const loginBodyContainerStyle = `mt-9 sm:mx-auto sm:w-full sm:max-w-sm`;
  const paragraphStyle = `mt-7 text-center text-sm/6 text-gray-500`;
  const linkStyle = `font-semibold text-indigo-600 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;

  return (
    <div className={loginBodyContainerStyle}>
      <FormComponent {...formProps} />
      <p className={paragraphStyle}>
        {message}
        <Link to={linkPath} className={linkStyle}>{linkLabel}</Link>
      </p>
    </div>
  );
}

export default AuthBodyCard;