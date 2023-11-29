import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) < new Date(evtA.date) ? 1 : -1
  );

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1 < byDateDesc?.length ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);

    return () => clearInterval(intervalId);
  }, [index]); // Ajout de l'index comme dépendance pour éviter les problèmes avec l'état asynchrone

  const generateId = () => Math.random().toString(36).substr(2, 9);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, idx) => (
            <input
              key={generateId()}
              type="radio"
              name="radio-button"
              checked={index === idx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
