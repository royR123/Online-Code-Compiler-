import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import Editor from './components/Editor';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/'>
            <Route index element = {<Home/>} />
            <Route path='editor/:userName' element = {<Editor />} />
          </Route>
        </Routes>
      </Router>
    </div>
    

  );
}

export default App;
