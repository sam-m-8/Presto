import potionIcon from "../../assets/potion-icon.svg";
import CreatePresentationButton from "./CreatePresentationButton";
import LogoutButton from "../auth/LogoutButton";

const DashboardHeader = () => {
  const headerStyle = "flex justify-between py-4 px-6 bg-transparent"
  const logoContainerStyle = "flex gap-1 md:gap-3 items-center";
  const logoStyle = "h-6 md:h-10 w-auto";
  const logoTextStyle = "md:text-2xl font-bold text-indigo-600";
  const buttonsContainerStyle = "flex gap-4";
  
  return (
    <header className={headerStyle}>
      <div className={logoContainerStyle}>
        <img className={logoStyle} src={potionIcon} alt="Presto logo"/>
        <h1 className={logoTextStyle}>Presto</h1>
      </div>
      <div className={buttonsContainerStyle}>
        <CreatePresentationButton/>
        <LogoutButton customStyle={"text-indigo-600 hover:bg-zinc-200/50"}/>
      </div>
    </header>
  );
}

export default DashboardHeader;