// Background.jsx
import { useEffect, useState } from 'react';
import './background.css';
import imagenSuperpuesta from '../../assets/header-img.svg';

const Background = () => {
  const [text, setText] = useState('');
  const fullText = "HELLO WORLD!";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(interval);
      }
    }, 200); // Velocidad de escritura (en milisegundos)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-container">
      <div className="background-image"></div>
      <div className="background-content">
        <img src={imagenSuperpuesta} alt="Imagen Superpuesta" className="imagen-superpuesta" />
        <div>
          <h1 className="background__title">{text}</h1>
          <p className="descrip">Design and create with UML the fun way! Discover our interactive tools to learn and play while you bring your ideas to life.</p>
        </div>
      </div>
      <button className="background__button">CREATE</button>
    </div>
  );
};

export default Background;
