// import logo from './logo.svg';
// import './App.css';
import Body from './component/Body';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './component/Login';
import Header from './component/Header';
import Browse from './component/Browse';
import MovieDialog from './component/MovieDialog';
import Successulr from './component/Successulr';
import FailurePayment from './component/FailurePayment';
import Subscription from './component/Subscription';
function App() {
  return (
    <div>
      <Router>
            <Header/>
            <MovieDialog/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/body" element={<Body />}>
          <Route path="subscription" element={<Subscription/>} />
          <Route path="successfull" element={<Successulr />} />
          <Route path="fail" element={<FailurePayment />} />
          <Route path="browse" element={<Browse />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
