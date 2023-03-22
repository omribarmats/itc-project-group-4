import React from 'react'

export default function ImageContainedBlurBG({ image, rgbR= 0, rgbG = 0, rgbB = 0, height = 'auto', alt = 'picture', opacity = 0.5, ...props }) {
  return (
    <div
      {...props}
      style={{
        height: height,
        width: '100%',
        position: 'relative',
       overflow: 'hidden'
      }}
    >
      <img
        {...props}
        src={image}
        alt={alt}
        style={{ display: 'block', filter: 'blur(8px)',width: '100%', margin: '0 auto',  position: 'absolute', transform: 'scale(1.22)'}}
      />
     
     <div
      style={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex:'1',
         // eslint-disable-next-line
        backgroundColor: `rgb(${rgbR},${rgbG},${rgbB})`, /* Fallback color */
        // eslint-disable-next-line
        backgroundColor: `rgba(${rgbR},${rgbG},${rgbB}, ${opacity})` /* Black w/opacity/see-through */
       }}
     />
      <img
        {...props}
        src={image}
        alt={alt}
        width='auto'
        style={{ 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'block', width: 'auto', margin: '0 auto', height: height, position: 'absolute', zIndex:'2'}}
      />
    </div>
  )
}
