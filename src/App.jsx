import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar/Navbar';
import Background from './Components/background/Background';
import Create from './Pages/create/Create'; // Importa el componente de la página Create

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Background />} />
          <Route path="/create" element={<Create />} /> {/* Agrega la ruta para la página Create */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;