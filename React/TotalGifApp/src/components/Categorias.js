import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GifSlideItem } from './GifSlideItem';

export const Categorias = () => {

    const [images1, setImages1] = useState([])
    const [images2, setImages2] = useState([])
    const [images3, setImages3] = useState([])

    useEffect( ()=> {
        getGifs1();
        getGifs2();
        getGifs3();

    }, []);

    const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";

    const getGifs1 = async() => {

    const resp = await fetch(`https://api.giphy.com/v1/gifs/search?q=reactions+meme+action&api_key=${apiKey}&limit=30`);

    const {data} = await resp.json();

    const gifs = data.map( img => {

        return {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }

    })

    setImages1(gifs);

}

const getGifs2 = async() => {

    const resp = await fetch(`https://api.giphy.com/v1/gifs/search?q=basketball+soccer&api_key=${apiKey}&limit=30`);

    const {data} = await resp.json();

    const gifs = data.map( img => {

        return {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }

    })

    setImages2(gifs);

}

const getGifs3 = async() => {

    const resp = await fetch(`https://api.giphy.com/v1/gifs/search?q=anime&api_key=${apiKey}&limit=30`);

    const {data} = await resp.json();

    const gifs = data.map( img => {

        return {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }

    })

    setImages3(gifs);

}

  return (
    <>
        <div className="margin"></div>

        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">MEMES</h2></div>

            <div className='slideP'>
                <div className='slideH animate__animated animate__fadeInUp'>
                    {
                        images1.map( (img1, i) => (
                            <Link key={i} to={`../gif/${img1.id}`}><GifSlideItem
                                key = {img1.id}   
                                {...img1}
                            /></Link>
                        ))
                    }
                </div>
            </div>

        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">DEPORTES</h2></div>
            <div className='slideP'>
                <div className='slideH animate__animated animate__fadeInUp'>
                    {
                        images2.map( (img2,i) => (
                            <Link key={i} to={`../gif/${img2.id}`}><GifSlideItem
                                key = {img2.id}   
                                {...img2}
                            /></Link>
                        ))
                    }
                </div>
            </div>

        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">ANIME</h2></div>
            <div className='slideP'>
                <div className='slideH animate__animated animate__fadeInUp'>
                    {
                        images3.map( (img3,i) => (
                            <Link key={i} to={`../gif/${img3.id}`}><GifSlideItem
                                key = {img3.id}   
                                {...img3}
                            /></Link>
                        ))
                    }
                </div>
            </div>
    </>
  )
}
