import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    const byDateCroissant = data?.focus.sort((evtA, evtB) =>
        new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
    );
    const nextCard = () => {
        setTimeout(
          () => {if (byDateCroissant)
          {setIndex(index + 1 < byDateCroissant.length ? index + 1 : 0)}},
          5000
          );
      };
      useEffect(() => {
        nextCard();
      });
    return (
        <div className="SlideCardList">
            {byDateCroissant?.map((event, idx) => (
                <div key={event.title}>
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
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateCroissant.map((_, radioIdx) => (
                                <input
                                    key={`input-${_.title}`}
                                    type="radio"
                                    name="radio-button"
                                    checked={idx === radioIdx}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;
