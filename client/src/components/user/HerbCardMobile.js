import React, { useEffect, useContext, useRef, useState } from 'react'
import { useClickAway } from 'react-use';
import HerbContext from '../../context/herb/herbContext';
import HerbCardCategories from './HerbCardCategories';
import '../../styles/herbcard.css'

const HerbCardMobile = ({ showCard, setShowCard })=> {

    const herbContext = useContext(HerbContext)
    const { herb } = herbContext

    const cardRef = useRef(null);
    const [showFoodInfo, setShowFoodInfo] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const [isPanel, setIsPanel] = useState(false)
    const [content, setContent ] = useState('')

    useEffect(() => {
        if(herb !== null && herb !== undefined){
            setContent(herb)
            setShowCard(true)
        }
    }, [herb, setContent, content, setShowCard])

    useClickAway(cardRef, () => {
        setShowCard(false)
    })

    const information = [
        {
          title: "Profile",
          content:  herb.description,
        },
        {
          title: "Origin",
          content: herb.origin,
        },
        {
            title: "Cusines",
            content: herb.cuisines,
        },
        {
            title: "Other Names",
            content: herb.other,
        },
        {
            title: "Substitutions",
            content:herb.substitutes,
        },
    ]

    const closeCard = () => {
        setShowCard(false)
    }

    const onClick = (e, index) =>{
        setActiveIndex(index)  
        setIsPanel(!isPanel)
    }

    const setPanelClassName = (index) => {
        if(activeIndex  === index && isPanel ){
            return 'info-row-panel active'
        }else{
            return 'info-row-panel'
        }
    }

    const setTitleClassName = (index) => {
        if(activeIndex  === index && isPanel ){
            return 'info-row-title active'
        }else{
            return 'info-row-title'
        }
    }

    return (
        <>
            {showCard &&
                <div className={showCard ? 'card-container show' : 'card-container'}>
                    <div ref={cardRef} className ={showCard ? 'card show' : 'card'}>
                        <div className="card-content">

                            <div className="herb-img-container">
                                <img src={herb.img} alt="herb"/>

                                <div className="close" onClick={closeCard}>
                                    <i className ="fas fa-times"></i>
                                </div>

                                <div className="card-header">
                                    <h1>{herb.name}</h1>
                                </div>
                            </div>

                            <div className="info">
                                <div className="info-rows">
                                    { information.map((info, index) =>( 
                                        <div className="info-row" key={index} onClick={(e)=>onClick(e, index)}>
                                            <h4 className={setTitleClassName(index)}>{info.title}</h4>
                                            <div className={setPanelClassName(index)}>
                                                <p>{info.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <HerbCardCategories 
                                categories={herb.categories}  
                                herbName={herb.name} 
                                showFoodInfo={showFoodInfo} 
                                setShowFoodInfo={setShowFoodInfo} 
                                setShowCard={setShowCard} 
                            />

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default HerbCardMobile
