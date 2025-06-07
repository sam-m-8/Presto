import VersionHistoryHeader from "../components/version_history/VersionHistoryHeader";
import { useParams } from "react-router-dom";
import { Context, useContext } from "../context";
import VersionHistoryItem from "../components/version_history/VersionHistoryItem";

const VersionHistoryPage = () => {
  const pageContainerStyle = "h-screen bg-zinc-100";
  const bodyContainerStyle = "flex justify-center";
  const contentContainerStyle = "w-full max-w-lg mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8";
  const contentHeaderStyle = "text-xl font-bold leading-none text-indigo-700 mb-4";
  const listContainerStyle = "flow-root flex justify-center";
  const divideStyle = "divide-y divide-indigo-200";

  const { id } = useParams();
  const { getters } = useContext(Context);

  // get presentation archive and sort objects in reverse chronological order
  const currentPresentation = getters.presentations[id];
  const archive = currentPresentation.archive || {};

  const reversedArchive = Object.keys(archive)
    .map((timestamp) => parseInt(timestamp))
    .sort((a, b) => b - a);

  return (
    <div className={pageContainerStyle}>
      <VersionHistoryHeader/>
      <div className={bodyContainerStyle}>
        <div className={contentContainerStyle}>
          <h2 className={contentHeaderStyle}>Version History</h2>
          <div className={listContainerStyle}>
            <ul role="list" className={divideStyle}>
              {reversedArchive.map((timestamp) => (
                <VersionHistoryItem
                  key={timestamp}
                  timestamp={timestamp}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersionHistoryPage;