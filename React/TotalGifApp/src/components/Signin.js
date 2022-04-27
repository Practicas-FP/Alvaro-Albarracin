import React, { useState  } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'


export const Signin = () => {

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const [error, setError] = useState(false);
  const [mError, setMError] = useState('');

  const navigate = useNavigate();

  const handleInputChange1 = ( e ) => {
    setInputValue1( e.target.value );
  }

  const handleInputChange2 = ( e ) => {
    setInputValue2( e.target.value );
  }

  const handleInputChange3 = ( e ) => {
    setInputValue3( e.target.value );
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const passC = document.getElementById('passC').value;

    if(pass != passC){
      setError(true);
      setMError("Las contraseñas no son iguales");
    } else {

      setError (false);

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential;

          signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
              const user = userCredential;
    
              onAuthStateChanged(auth, (user) => {
                
                if (user) {
                  const uid = user.uid;            
                } 
    
              })
              
          })
    
          navigate('../cuenta')

      }).catch((err) => {
        setError (true);
        
        if(err.code == "auth/invalid-email") {
          setMError("El correo electrónico no es válido");
        } 

        if(err.code == "auth/wrong-password") {
          setMError("La contraseña es incorrecta");
        } 

        if(err.code == "auth/user-not-found") {
          setMError("El usuario no existe");
        } 

        if(err.code == "auth/internal-error") {
          setMError("Debes completar usuario y contraseña");
        } 

        if(err.code == "auth/weak-password") {
          setMError("Contraseña demasiado corta");
        } 


      });

    }

}

  return (
    <>
        <div className="margin"></div>

        <div align="center"><h2 className="cabecera animate__animated animate__fadeInUp">CREA TU CUENTA</h2></div>

        <div align="center">
          <div style={{maxWidth:500}}>
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text"
                    value={ inputValue1 }
                    onChange={ handleInputChange1 }
                    placeholder="Usuario"
                    autoComplete='off'
                    id="email"
                    className='animate__animated animate__fadeInUp'
                />
                <input 
                    style={{marginTop:-10}}
                    type="password"
                    value={ inputValue2 }
                    onChange={ handleInputChange2 }
                    placeholder="Contraseña"
                    autoComplete='off'
                    id="pass"
                    className='animate__animated animate__fadeInUp'
                />
                <input 
                    style={{marginTop:-10}}
                    type="password"
                    value={ inputValue3 }
                    onChange={ handleInputChange3 }
                    placeholder="Repite la contraseña"
                    autoComplete='off'
                    id="passC"
                    className='animate__animated animate__fadeInUp'
                />
                
                {error ==true && <div style={{maxWidth:500}} className="error animate__animated animate__fadeIn"><b>{mError}</b></div>}

                <button className='hash animate__animated animate__fadeInUp'>
                  Crear
                  </button>
            </form>
            <div className="animate__animated animate__fadeInUp"><span>¿Ya tienes cuenta?</span> <b><i><span><NavLink to="../login">Acceder</NavLink></span></i></b></div>
          </div>
        </div>
    </>
  )
}
