import { useState, useEffect, useContext, useRef } from 'react'
import { useClickAway } from 'react-use';
import HerbCardCategories from './HerbCardCategories'
import HerbContext from '../../context/herb/herbContext'
//import allspice from '../../img/chives.jpg'

const HerbCard = ({ showCard, setShowCard }) => {

    const herbContext = useContext(HerbContext)
    const { getHerbs, herb } = herbContext

    const cardRef= useRef(null);
    const[showFoodInfo, setShowFoodInfo] = useState(false)

    useEffect(() => {
        getHerbs()

        if (herb !== null ) {
            setShowCard(true)
        }
    }, [herb, getHerbs, setShowCard])
 
    useClickAway(cardRef, () => {
        setShowCard(false)
    })

    return (
        <>
            {herb !== null && 
                <>
                    <div ref={cardRef} className ={showCard ? 'card show' : 'card'}>

                        <div className="card-header">
                            <h1>{herb.name}</h1>
                        </div>

                        <div className="card-content">
                            <div className="info">
                                <div className="herb-img-container">
                                    <img src={herb.img} alt="herb"/>
                                    <div className ="overlay"></div>
                                </div>

                                <div className="info-rows">
                                    <div className="row-one">
                                        <span className="row-span">
                                            <h4>Profile</h4>
                                            <p>{herb.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est magnam repudiandae ex explicabo mollitia, exercitationem optio.'}</p>
                                        </span>
                                    </div>

                                    <div className={!showFoodInfo ? 'row-two' : 'row-two hide'}>
                                        <div className="left-div">
                                            <span className="row-span">
                                                <h4>Origin</h4>
                                                <p>{herb.origin || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
                                            </span>
                            
                                            <span className="row-span">
                                                <h4>Other Names</h4>
                                                <p>{herb.other || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
                                            </span>
                                        </div>

                                        <div className="right-div">
                                            <span className="row-span">
                                                <h4>Cuisines</h4>
                                                <p>{herb.cuisines || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
                                            </span>
                                    
                                            <span className="row-span">
                                                <h4>Substitutes</h4>
                                                <p>{herb.substitutes || 'Lorem ipsum dolor sit amet consectetur.'}</p>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <HerbCardCategories categories={herb.categories}  herbName={herb.name} showFoodInfo={showFoodInfo} setShowFoodInfo={setShowFoodInfo} setShowCard={setShowCard} />
                            
                        </div>
                    </div>
                </>
            }
     
        </>
    )
}

export default HerbCard
