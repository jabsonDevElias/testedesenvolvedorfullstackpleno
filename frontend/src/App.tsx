import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES
import Login from "./pages/Login";
import CadastraUsuario from "./pages/CadastraUsuario";
import Tarefas from "./pages/Tarefas";
import CadastraTarefas from "./pages/CadastraTarefas";

//AUTENTICAÇÃO
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrausuario" element={<CadastraUsuario  />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Tarefas />} />
          <Route path="/cadastratarefas/:id?" element={<CadastraTarefas />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
