import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { useEffect, useRef } from 'react';

const TitleCards = ({title,category}) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

     if (cardsRef.current) {
    cardsRef.current.scrollLeft += event.deltaY;
  }
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
