import { useCallback, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) => 
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  )

const nextCard = useCallback(() => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    )
  }, [index, byDateDesc])
  
  useEffect(() => {
    nextCard()
  }, [nextCard])
   
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  return (
    <div key={index} className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
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