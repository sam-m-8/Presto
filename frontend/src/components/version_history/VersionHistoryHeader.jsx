import LogoutButton from "../auth/LogoutButton";
import BackButton from "../template/BackButton";
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";

const VersionHistoryHeader = () => {
  const headerStyle = "flex justify-between items-center py-2 px-3 bg-gradient-to-r from-indigo-700 to-purple-600"
  const logoTextStyle = "md:text-2xl font-bold text-white";
  const buttonsContainerStyle = "flex gap-2";

  const { id } = useParams();
  const { getters } = useContext(Context);

  return (
    <>
      <header className={headerStyle}>
        <BackButton
          path={`/presentations/${id}/1`}
        />

        <div className="flex items-center gap-3 md:gap-6">
          <h1 className={logoTextStyle}>
            {getters.presentations[id].title}
          </h1>
        </div>


        <div className={buttonsContainerStyle}>
          <LogoutButton customStyle={"text-white hover:bg-white/20"}/>
        </div>
      </header>
    </>
  );
}

export default VersionHistoryHeader;