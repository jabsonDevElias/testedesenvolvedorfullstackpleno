
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//PAGES
import Home from "./pages/Home";
import CadastraUsuario from "./pages/CadastraUsuario";
import Tarefas from './pages/Tarefas';

import { useEffect, useState } from 'react';


function App() {
  const [token,setToken] = useState();

  useEffect(() => {
    const tokenLocal:any = localStorage.getItem("authToken");
    setToken(tokenLocal);
  }, []);

  if(token){

    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tarefas" element={<Tarefas/>} />
          </Routes>
        </Router>
      </>
    )

  }else{

    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/cadastrausuario" element={<CadastraUsuario/>} />
          </Routes>
        </Router>
      </>
    )

  }
}

export default App
