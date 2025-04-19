import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { useEffect, useRef, useState } from 'react';

const TitleCards = ({title,category}) => {

  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGMzZjhlOGEyMjg3NWI3ZDIxMTk2MzBkNmE3MWNmYiIsIm5iZiI6MTc0NTAzNzc5NS40NDksInN1YiI6IjY4MDMyOWUzYjExM2ZmODcyM2Q5YzI2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFESqGc1VMBVhg5Z81R2r-KuL8YWmt3YEWT0qZsOmjA'
    }
  };
 
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

     if (cardsRef.current) {
    cardsRef.current.scrollLeft += event.deltaY;
  }
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
     
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

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
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
