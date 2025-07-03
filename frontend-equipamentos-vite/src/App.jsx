import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Equipamentos from "./pages/Equipamentos";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Manutencoes from "./pages/Manutencoes";
import Relatorios from "./pages/Relatorios";
// Importe outras páginas futuramente

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/manutencoes" element={<Manutencoes />} />
          <Route path="/dashboards" element={<Relatorios />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
