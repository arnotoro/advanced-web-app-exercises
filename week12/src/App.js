import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyContainer from './components/MyContainer';
import About from './components/About';
import Header from './components/Header';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<> <Header /> <MyContainer /> </>} />
          <Route path="/about" element={<> <Header /> <About /> </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
