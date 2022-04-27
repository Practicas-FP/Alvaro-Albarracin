import React, { useState, useEffect } from 'react'
import { GifGridItem100 } from "./GifGridItem100";
import { Link } from 'react-router-dom';


export const GifGridT = ( {category} ) => {

  const [images, setImages] = useState([])

    useEffect( ()=> {
        getGifs();
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

        <><div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">TENDENCIAS: {category.toString().toUpperCase()}</h2></div><div className="grid animate__animated animate__fadeIn">


                {images.map((img, i) => (
                    <Link key={i} to={`../gif/${img.id}`}><GifGridItem100
                        key={img.id}
                        {...img} /></Link>
                ))}
            </div></>
        }   
        {images.length == 0 &&

        setTimeout(() => {
        
        <>
            <div align="center"><h2 className="cabecera">PÁGINA NO ENCONTRADA</h2></div><div align="center">
                <img style={{ maxWidth: 300, marginTop: -40 }} src="https://media4.giphy.com/media/hS42TuYYnANLFR9IRQ/giphy.gif?cid=a267dfa3sm9q5yvqqvz94qvi4u1ude9u0e3vtvdsbe9tio4t&rid=giphy.gif&ct=s&1644624000069" />
            </div>
        </>

        }, 1000)
        
        }
    </>
    )
}
