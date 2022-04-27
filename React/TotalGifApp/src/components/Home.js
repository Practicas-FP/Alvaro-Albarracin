import React, { useState, useEffect } from 'react'
import { GifGridItem75 } from './GifGridItem75';
import { Link } from 'react-router-dom'
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GifSlideItem } from './GifSlideItem';


const firebaseConfig = {
  apiKey: "AIzaSyBdf5gvICjXC9vwZl7qfICi3Rbpfd742B8",
  authDomain: "gifapp-c6955.firebaseapp.com",
  projectId: "gifapp-c6955",
  storageBucket: "gifapp-c6955.appspot.com",
  messagingSenderId: "217904841292",
  appId: "1:217904841292:web:0d5895012424befd3f2ae9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const Home = () => {
   
  const [queries, setQueries] = useState([])
  const [data, setData] = useState([]);
  const [login, setLogin] = useState(false);


  useEffect( ()=> {
    getQueries();
    getGifsBD();
  }, []);

  let gif = [];
  let gifs = [];

  const getGifsBD = () => {

    onAuthStateChanged(auth, async(user) => {

      if (user) {

        setLogin(true)
      
        const docRef = collection(db, user.uid);
        
        const docSnap = await getDocs(docRef);

        docSnap.forEach(doc =>{

          gif = {
            id: doc.get('id'),
            title: doc.get('titulo'),
            url: doc.get('url')
          }

          gifs.push(gif)
          setData(gifs)
          gif = []

        })

      } else {

setLogin(false)

      }
    
  })

}

  const getQueries = async() => {

    const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";
    const url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`

    const resp = await fetch(url);

    const {data} = await resp.json();

    setQueries(data)

  }

  const [images, setImages] = useState([])

  useEffect( ()=> {
      getGifs();
  }, []);

  const getGifs = async() => {

  const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";
  const limit = 15;
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`

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

    <>
        <div className="margin"></div>

        {login == true && data.length>0 &&  
        
        <>
        <div align="center" style={{marginBottom:-30}}><h5 className="cabeceraH animate__animated animate__fadeInUp"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-heart-fill" viewBox="3 0 12 18"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg> GIFS FAVORITOS</h5></div>
        
        <div className='slideP'>
          <div className='slideH animate__animated animate__fadeIn'>
            {data.map((img, i) => (
              <Link key={i} to={`../gif/${img.id}`}><GifSlideItem
                key={img.id}
                {...img} /></Link>
            ))}
          </div>
        </div>
        </>
        }

        <div className="container" style={{maxWidth:1600, paddingLeft:50, paddingRight:50}}>
        <div className="row">

         <div align="center" className="col-xl-9" ><h5 className="cabeceraH animate__animated animate__fadeInUp"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="deeppink" className="bi bi-star-fill" viewBox="3 0 12 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg> POPULAR GIFS </h5>
  
         <div style={{marginTop:-25, maxHeight:740, overflow:'hidden'}} className="grid animate__animated animate__fadeIn">
            {
                images.map( (img,i) => (
                    <Link key={i} to={`../gif/${img.id}`}><GifGridItem75
                    key = {img.id}    
                    {...img}
                    /></Link>
                ))
            }
        </div>

      </div>
    
      <div align="center" className="col-xl-3">

      <div align="center"><h5 className="cabeceraH animate__animated animate__fadeInUp"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="deepskyblue" className="bi bi-lightning-fill" viewBox="0 0 16 16"><path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"/></svg> TRENDING</h5></div>
        <div style={{maxHeight:695, overflow:'hidden'}}>
        {
            queries.map((query, i) => {return <Link key={i} to={`tendencias/${query}`}><button id={query} className='hash animate__animated animate__fadeIn' key={i}>{query}</button></Link>})
        }
      </div>
      </div>

      </div>
      </div>

    </>


  )
}


