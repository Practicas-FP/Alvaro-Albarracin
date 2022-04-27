import React from 'react'

export const GifGridItem75 = ( {title, url} ) => {

  return (
    <>
      <div className='gif75'>
        <img className='card-img-top' src={url} alt={title}/>
      </div>

    </>
  )
}
