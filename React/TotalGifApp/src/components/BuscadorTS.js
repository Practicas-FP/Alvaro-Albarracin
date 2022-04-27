import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifGridT } from './GifGridT';

export const BuscadorTS = ( ) => {

    const params = useParams();

    const [categories, setCategories] = useState([params.id]);

    return (
    <>

        <div className="margin"></div>
                          
       {
       categories.map(category =>(
            <GifGridT 
                key={category}
                category={category}
            />
        ))
       }
                
    </>
    )

}
