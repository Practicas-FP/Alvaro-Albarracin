import React from 'react';

export const GifGridItem100 = ( {title, url} ) => {

  return (
    <>
      <div className='gif100'>
        <img className='card-img-top' src={url} alt={title}/>
      </div>

    </>
  )
}
