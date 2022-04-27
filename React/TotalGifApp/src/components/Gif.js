import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

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


export const Gif = ( ) => {

    const params = useParams();

    const id = params.id;

    const [uid, setUid] = useState(['']);
    const [queries, setQueries] = useState([])
    const [espera, setEspera] = useState([0])
    const [espera1, setEspera1] = useState([0])
    const [login, setLogin] = useState(false);

    let isfav = false;

    useEffect( ()=> {
        setTimeout(() => {
            getQueries();
            setEspera(1)    
        }, 300);

        setTimeout(() => {
            setEspera1(1)
        }, 600);
    }, []);

    const getQueries = async() => {

    const apiKey = "NpXX2OxDpYCl5VO4C7FQqM8lAZbaijeI";
    const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`
    const resp = await fetch(url);
    const {data} = await resp.json();

    setQueries(data)

  }

    const auth = getAuth();
    
      onAuthStateChanged(auth, async (user) => {

        if (user) {

          setUid(user.uid);

          setLogin(true)

          try{
              const docRef = doc(db, uid, id);
              
              const docSnap = await getDoc(docRef);
                                
                  if (docSnap.exists()) {
                      document.getElementById('fav').style.display='block'    
                      document.getElementById('nofav').style.display='none'     
                      isfav = true;
                    } else {
                        document.getElementById('fav').style.display='none'    
                        document.getElementById('nofav').style.display='block'    
                        isfav = false;          
                    }
                    
            } catch(error){}
                
        } else {

            setLogin(false)

        }
  
     })


    function handleClick(e) {
        e.preventDefault();
            if(isfav){    
                document.getElementById('fav').style.display='none'    
                document.getElementById('nofav').style.display='block'    
                isfav = false;

                deleteDoc(doc(db, uid, id ));

            } else {
                document.getElementById('fav').style.display='block'    
                document.getElementById('nofav').style.display='none'     
                isfav = true;

                setDoc(doc(db, uid, id), {
                    titulo: queries.title,
                    url: queries.images.downsized_medium.url,
                    id: queries.id
                  
                  });

            }     
    }
       
    return (
    <>

        <div className="marginB"></div>

        <div align="center" className="animate__animated animate__fadeIn">

        {espera == 0 &&<div align="center"><img width={100} src="https://www.utedyc.org.ar/legales/loading.gif"/></div>}
        
            {queries.length != 0 &&<div className='imgGif'><a href={queries.embed_url} target="_blank"><img src={queries.images.downsized_medium.url}/></a></div>}

            {queries.length != 0 && 
                <div style={{margin:'15px'}}>
                <h3>{queries.title}</h3>
                <p>Subido el <b><i>{(queries.import_datetime).substr(8,2)+'/'+(queries.import_datetime).substr(5,2)+'/'+(queries.import_datetime).substr(0,4)}</i></b>{queries.username != '' && <span> por <b><i><a href={queries.source} target='_blank'>{queries.username}</a></i></b></span>}</p>
                { login == true && 
                <>
                    <button onClick={handleClick} id="fav" className="fav"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg></button><button onClick={handleClick} id="nofav" className="nofav"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg></button>
                </>
                }
                </div>
            }

            {queries.length == 0 && espera1 == 1 &&              
                <>
                <div align="center"><h2 className="cabecera">PÁGINA NO ENCONTRADA</h2></div><div align="center">
                    <img style={{ maxWidth: 300, marginTop: -70 }} src="https://media4.giphy.com/media/hS42TuYYnANLFR9IRQ/giphy.gif?cid=a267dfa3sm9q5yvqqvz94qvi4u1ude9u0e3vtvdsbe9tio4t&rid=giphy.gif&ct=s&1644624000069" />
                </div>
                </>
            }
            
        </div>
    </>
    )

}


