import { Context, useContext } from "./context";


const useUpdateArchive = () => {
  const { setters } = useContext(Context);

  const updateArchive = (presentationId, updatedPresentations) => {
    const currTime = Date.now();
    const currPresentation = updatedPresentations[presentationId];

    const archive = currPresentation.archive || {};
    const lastArchiveTimestamp = Math.max(...Object.keys(archive).map(Number), 0);

    let updatedArchive = {};
    if (currTime - lastArchiveTimestamp < 60000) {
      updatedArchive = {
        ...archive,
        [lastArchiveTimestamp]: currPresentation.slides,
      };

    } else {
      updatedArchive = {
        ...archive,
        [currTime]: currPresentation.slides,
      };
    }

    updatedPresentations[presentationId] = {
      ...currPresentation,
      archive: updatedArchive,
    };

    setters.setPresentations(updatedPresentations);
  };

  return updateArchive;
};

export default useUpdateArchive;