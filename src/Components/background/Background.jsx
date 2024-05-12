
// Background.jsx
import fondo from '../../assets/fondo.png';
import './background.css';

const Background = () => {
  return (
    <div className="background" style={{ backgroundImage: `url(${fondo})` }}>
      {/* Aquí puedes colocar cualquier contenido adicional que desees */}
    </div>
  );
};

export default Background;
