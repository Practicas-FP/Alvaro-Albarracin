import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const NavBar = () => {

    const [login, setLogin] = useState([false]);
    const [miEmail, setEmail] = useState([false]);
    
    let pulsado = false;

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const email = user.email;
          setEmail(email)

        setLogin(true) 

        } else {
            
            setLogin(false) 

        }
    })

    function handleClick(e) {
        e.preventDefault();
            if(pulsado){
                document.getElementById('menu').style.right='-210px';
                document.getElementById('mr').style.color='white'    
                document.getElementById('mr').style.border='2px solid white'    
                document.getElementById('equis').style.display='none'    
                document.getElementById('burguer').style.display='block'    
                pulsado = false;
            } else {
                document.getElementById('menu').style.right='0px';
                document.getElementById('mr').style.color='orangered'    
                document.getElementById('mr').style.border='2px solid orangered' 
                document.getElementById('equis').style.display='block'    
                document.getElementById('burguer').style.display='none'    
                pulsado = true;

            }     
    }

    function handleBlur(e) {
        e.preventDefault();
        document.getElementById('menu').style.right='-210px'
        document.getElementById('mr').style.color='white'    
        document.getElementById('mr').style.border='2px solid white'
        document.getElementById('equis').style.display='none'    
        document.getElementById('burguer').style.display='block'  
        pulsado = false;
      
    }

    return (
        <>
        
        <nav className="navbar navbar-expand navbar-dark">

            <Link
                className="navbar-brand"
                to=""
            >
                <h1 className="titulo">TotalGifApp</h1>
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav navbarR">

                    <NavLink
                        className="nav-item nav-link"
                        to="artistas"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-people-fill" viewBox="-1 -1 16 21"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" /><path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg> Artistas
                    </NavLink>

                    <NavLink
                        className="nav-item nav-link"
                        to="categorias"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-collection" viewBox="-1 0 16 21"><path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" /></svg> Categorías
                    </NavLink>

                    <NavLink
                        className="nav-item nav-link"
                        to="buscar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="-2 0 16 20"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg> Buscador
                    </NavLink>

                </div>

            </div>

            <div className="navbar-nav der navbarR">

                {login == true && <NavLink
                    className="nav-item nav-link float-right"
                    to="cuenta"
                >
                    {miEmail}
                </NavLink>}

                {login != true && <NavLink
                    className="nav-item nav-link float-right"
                    to="login"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="-1 0 16 19"><path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/><path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg> Login
                </NavLink>}

            </div>

            <div className="navbar-nav der navbarMR">
                    <button id="mr" onBlur={handleBlur} onClick={handleClick} type="submit" className="mr"><svg id="burguer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list burger" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" /></svg><svg id="equis" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x equis" viewBox="0 1 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>
            </div>

        </nav>
        
        <nav id="menu" className="navbar navbar-expand navbar-dark display">
                <div className="navbar-collapse">
                    <div className="">

                        <NavLink
                            className="nav-item nav-link"
                            to="artistas"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-people-fill" viewBox="-1 -1 16 21"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" /><path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg> Artistas
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link"
                            to="categorias"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-collection" viewBox="-1 0 16 21"><path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" /></svg> Categorías
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link"
                            to="buscar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="-2 0 16 20"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg> Buscador
                        </NavLink>

                        <hr/>

                        {login == true && 
                        
                        <>
                        
                            <NavLink
                                className="nav-item nav-link float-right"
                                to="cuenta"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="-1 0 16 19"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /></svg> Mi cuenta
                            </NavLink>
                            
                            
                        </>
                        
                        }

                        {login != true && <NavLink
                            className="nav-item nav-link float-right"
                            to="login"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="-1 0 16 19"><path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/><path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg> Login
                        </NavLink>}

                    </div>

                </div>
            </nav>
            
            </>

    )

    
}