import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SubmitBooks from './components/SubmitBooks';
import Book from './components/Book';
import Header from './components/Header';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/book/:name" element={<> <Header /> <Book /></>} />
        <Route path="/" element={<> <Header /> <SubmitBooks /> </>} />
        <Route path="*" element={<> <Header /> <h1 style={{textAlign: 'center'}}>404: This is not the webpage you are looking for</h1> </>} />
      </Routes>
    </Router>
  );
}

export default App;
