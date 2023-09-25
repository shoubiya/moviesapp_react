import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
  import Home from './Home';
import Details from './Details';
function App() {
  return (
    <div className="App">
     <>
       <BrowserRouter>
       <Routes>
       <Route  path="/"  element={<Home/>}></Route>
       <Route  path="/Details/:id"   element={<Details/>}></Route>
       </Routes>
      
       </BrowserRouter>
        
       </> 
    </div>
    
  );
}

export default App;

