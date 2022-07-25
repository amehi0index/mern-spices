import React from 'react'
import Lottie from 'react-lottie'
import animationData from './food.json'

const Loader = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div className="loader-container">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  )
}

export default Loader
