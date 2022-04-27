import React, { Fragment, useEffect, useState, useTransition } from 'react'

export const Artistas = () => {

    const [users, setUsers] = useState([])

    useEffect( ()=> {
        getUsuarios();
    }, []);

    const getUsuarios = async() => {

    const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";
    const limit = 30;
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`

    const resp = await fetch(url);

    const {data} = await resp.json();

    const preUsuarios = data.filter(usr=>{return usr.user != undefined}).map( usr => {

            return {
                nombre: usr.user.display_name,
                avatar: usr.user.avatar_url,
                url: usr.user.profile_url,
                usuario: usr.user.username,
                ig: usr.user.instagram_url,
                web: usr.user.website_url
            } 
       
    })

    function eliminarObjetosDuplicados(arr, prop) {
        var nuevoArray = [];
        var lookup  = {};
    
        for (var i in arr) {
            lookup[arr[i][prop]] = arr[i];
        }
    
        for (i in lookup) {
            nuevoArray.push(lookup[i]);
        }
    
        return nuevoArray;
   }
    
   const usuarios = eliminarObjetosDuplicados(preUsuarios, 'usuario');

   const usuariosFinal = usuarios.splice(1,10);

    setUsers(usuariosFinal);

}

  return ( 
    <>
        <div className="margin"></div>

        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">TOP ARTISTAS</h2></div>
        
        <div className="container" style={{maxWidth:1500, paddingLeft:50, paddingRight:50}}>
        <div className="row">

            
            {
                users.map( (usr, i) => 
            
                    (
                        
                        <Fragment key={i}>
                        <div className="col-sm-6">                        
                        <div className="grid animate__animated animate__fadeInUp">

                            <div align="center" className="col-xl-3" >

                                <div className='imgUser '>
                                    <a href={usr.url} target='_blank'><img className='card-img-top' src={usr.avatar} alt={usr.usuario}/></a>
                                </div>

                            </div>

                            <div align="left" className="col-xl-8 ms-3 infoUser">
                                <b  style={{fontSize:'30px'}}>{usr.nombre}</b>
                                <p><b>Username:</b> {usr.usuario}</p>
                                <a href={usr.url} target="_blank"><img style={{marginRight:10}} height='30' src="https://static.bossinsights.com/img/integrations/giphy.png"/></a>{usr.web != '' &&<a href={usr.web} target="_blank"><img style={{marginRight:10}} height='30' src='https://www.pngmart.com/files/11/WWW-World-Wide-Web-PNG-Image.png'/></a>}{usr.ig != '' &&<a href={usr.ig} target="_blank"><img height='30' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'/></a>}

                            </div>

                        </div>
                            <hr/>
                        </div>

                        </Fragment>
                        
                      
                    )

                )
            }


    </div>
    </div>

    </>
  )
}
