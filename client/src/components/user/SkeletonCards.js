import React from 'react'
import SkeletonCardItem from './SkeletonCardItem'

const SkeltonCards = ({ recipes }) => {
    const dummyArr = [1,2,3,4,5,6,7,8,9,10]
    
    return (
        <>
            <div className="recipe-cards">
                {dummyArr.map((dummy, index) => (
                        <SkeletonCardItem key={index} />
                ))}
            </div>
        </>
    )
}

export default SkeltonCards