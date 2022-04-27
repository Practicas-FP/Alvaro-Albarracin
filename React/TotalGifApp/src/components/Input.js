import React, { useState } from 'react'
import PropTypes from 'prop-types';

export const Input = ({ setCategories }) => {
    
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = ( e ) => {
        setInputValue( e.target.value );
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( inputValue.trim().length > 1 ) {
            setCategories( [ inputValue ] );
            const elemento = document.getElementById('cajaTexto');
            elemento.blur();

        }

    }

    return (
        <form onSubmit={ handleSubmit }>
            <input 
                type="text"
                value={ inputValue }
                onChange={ handleInputChange }
                placeholder="Buscar gifs"
                autoComplete='off'
                id="cajaTexto"
                className='animate__animated animate__fadeInUp'
            />
        </form>
    )
}


Input.propTypes = {
    setCategories: PropTypes.func.isRequired
}
