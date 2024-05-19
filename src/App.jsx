import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './Components/background/Background';
import Create from './Pages/create/Create'; // Importa el componente de la página Create
import Concept from './Pages/concept/Concept';
import Challenge from './Pages/challengue/Challenge';
import Login from './Pages/login/Login';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/background" element={<Background />} />
          <Route path="/create" element={<Create />} /> {/* Agrega la ruta para la página Create */}
          <Route path="/concept" element={<Concept />} />
          <Route path="/challenge" element={<Challenge />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;