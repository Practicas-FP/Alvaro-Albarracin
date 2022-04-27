import React, { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { GifGridItem100 } from './GifGridItem100';

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

export const Cuenta = () => {
  
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [espera, setEspera] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect( ()=> {
    getGifs();
    setTimeout(() => {
      setEspera(1)
  }, 600);
  }, []);
  
  let gif = [];
  let gifs = [];

  const getGifs = () => {

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

      }
    
  })

}



  const handleClick = ( e ) => {
    e.preventDefault();
    signOut(auth)
    setLogin(false)
    navigate('/')
  }
 
  return (
    <> 
        { login == true &&
          <><div className="margin"></div><div align="center">
        <div style={{ marginTop: 30 }}>
          <button onClick={handleClick} className=" logout animate__animated animate__fadeInUp">Logout</button>
        </div>
      </div></>
      }

        {data.length>0 && login==true && 

          <>
          <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">FAVS</h2></div>
          
          <div className="grid animate__animated animate__fadeIn">
            {data.map((img, i) => (
              <Link key={i} to={`../gif/${img.id}`}><GifGridItem100
                key={img.id}
                {...img} /></Link>
            ))}
          </div>
        </>
        }

        {data.length==0 && espera == 1 && login == true &&

        <>
        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">NO FAVS</h2></div>
        </>
        }

        {login == false &&

        <>
            <div style={{ paddingTop: 120 }} align="center"><h2 className="cabecera">PÁGINA NO ENCONTRADA</h2></div><div align="center">
                <img style={{ maxWidth: 300, marginTop: -40 }} src="https://media4.giphy.com/media/hS42TuYYnANLFR9IRQ/giphy.gif?cid=a267dfa3sm9q5yvqqvz94qvi4u1ude9u0e3vtvdsbe9tio4t&rid=giphy.gif&ct=s&1644624000069" />
            </div>        </>
        }

    </>
  )
}
