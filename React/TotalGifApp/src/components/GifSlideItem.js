import React from 'react'

export const GifSlideItem = ( {title, url} ) => {

  return (
    <>
      <div className='gifSlide'>
        <img className='card-img-top' src={url} alt={title}/>
      </div>

    </>
  )
}
