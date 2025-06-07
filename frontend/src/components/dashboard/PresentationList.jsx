import { useEffect, useState } from "react";
import { useContext, Context } from "../../context";
import PresentationListCard from "./PresentationListCard";

const PresentationList = () => {
  const listContainerStyle = "mt-5 grid grid-flow-row px-8 gap-5 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
  const { getters } = useContext(Context);
  const [cards, setCards] = useState([]);

  // sort the user's list of presentations to appear in reverse chronological order on the dashboard
  // everytime a new presentation is added
  useEffect(() => {
    if (getters.presentations) {
      setCards(Object.values(getters.presentations).reverse());
    }
  }, [getters.presentations]);

  return (
    <div className={listContainerStyle}>
      {cards.map(card => (
        <PresentationListCard
          key={card.id}
          presId={card.id}
          thumbnail={card.thumbnail}
          numSlides={card.slides.length}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default PresentationList;