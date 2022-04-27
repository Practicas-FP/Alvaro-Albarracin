import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Buscador } from '../components/Buscador';
import { BuscadorTS } from '../components/BuscadorTS';
import { NavBar } from '../components/NavBar';
import { Artistas } from '../components/Artistas';
import { Categorias } from '../components/Categorias';
import { Login } from '../components/Login';
import { Signin } from '../components/Signin';
import { Home } from '../components/Home';
import { Gif } from '../components/Gif';
import { Cuenta } from '../components/Cuenta';
import { Error } from '../components/Error';


export const AppRouter = () => {
  return (
    <BrowserRouter>
    <NavBar/>
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="artistas" element={<Artistas />} />
            <Route path="buscar" element={<Buscador />} />
            <Route path="tendencias/:id" element={<BuscadorTS />} />
            <Route path="gif/:id" element={<Gif />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="login" element={<Login />} />
            <Route path="signin" element={<Signin />} />
            <Route path="cuenta" element={<Cuenta />} />
        </Routes>
    </BrowserRouter>
  )
}
