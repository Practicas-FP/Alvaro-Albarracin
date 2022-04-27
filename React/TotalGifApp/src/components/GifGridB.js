import React, { useState, useEffect } from 'react'
import { GifGridItem100 } from "./GifGridItem100";
import { Link } from 'react-router-dom';


export const GifGridB = ( {category} ) => {

  const [images, setImages] = useState([])
  const [espera, setEspera] = useState([0])


    useEffect( ()=> {
        getGifs();
        setTimeout(() => {
            setEspera(1)
        }, 300);
    }, []);

    const getGifs = async() => {

        const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";
        const q = encodeURI( category );
        const limit = 30;
        const url = `https://api.giphy.com/v1/gifs/search?q=${q}&limit=${limit}&api_key=${apiKey}`

        const resp = await fetch(url);

        const {data} = await resp.json();

        const gifs = data.map( img => {

            return {
                id: img.id,
                title: img.title,
                url: img.images.downsized_medium.url
            }

        })

        setImages(gifs);

    }

    return (
    <> {images.length != 0 &&
        <><div align="center"><h2 className="cabeceraB animate__animated animate__fadeInUp">BÚSQUEDA: {category.toString().toUpperCase()}</h2></div><div className="grid animate__animated animate__fadeIn">
                {images.map((img, i) => (
                    <Link key={i} to={`../gif/${img.id}`}><GifGridItem100
                        key={img.id}
                        {...img} /></Link>
                ))}
            </div></>
        } 

        {images.length == 0 && category != '' && espera == 1 &&
        <>
        <div align="center" className='grid animate__animated animate__fadeInUp'><h2 className="cabecera">SIN RESULTADOS</h2></div>
        </>
        }  
    </>
    
    )
}
