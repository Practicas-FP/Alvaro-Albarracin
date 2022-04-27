import React, { useState } from 'react'
import { GifGridB } from './GifGridB';
import { Input } from './Input';


export const Buscador = ( ) => {
    
    const [categories, setCategories] = useState(['']);

    return (
    <>
        <div className="marginB"></div>

        <Input category={categories} setCategories={ setCategories } />
                          
       {
       categories.map(category =>(
            <GifGridB 
                key={category}
                category={category}
            />
        ))
       }
                
    </>
    )

}
