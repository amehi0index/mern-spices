import React, { useState, useContext, useEffect} from 'react'
import Search from '../user/Search'
import HerbCard from '../user/HerbCard'
import HerbContext from '../../context/herb/herbContext'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import HerbCardMobile from '../user/HerbCardMobile'
import '../../App.css'

const Home = ({ showCard, setShowCard, setIsSearch, isSearch, loading }) => {

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const herbContext = useContext(HerbContext)
    const { herb } = herbContext
    const [showResults, setShowResults] = useState(false)

    useEffect(()=> {
        if(herb){
            setShowCard(true)
        }
    }, [herb, setShowCard])

    const showSearch = () => {
        setIsSearch(true)
    }
    
    return (
        <>
            <div className="container">
                <div className="home-header">
                    <div className="brand">
                        <span className="before">Ultimate</span>
                        <h2>Herbs & Spices</h2>
                        <span className="after">Finder</span>
                    </div>
                </div>
                <div className="content">
                    <div className={ isSearch ? 'welcome hide-welcome' :'welcome'}>
                        <h2>Find Your Flavor</h2>
                        <p> Take your recipes to the next level. Find the perfect herb or spice for your ingredients with The Ultimate Herb and Spice Finder.
                        </p>
                        <button className={ isSearch ? 'expand-search-btn hide' : 'expand-search-btn'} onClick={showSearch}>Search</button>
                    </div>
                    <Search isSearch={isSearch} setIsSearch={setIsSearch} showCard={showCard}  setShowCard={setShowCard} showResults={showResults} setShowResults={setShowResults} />  
                </div>
        
                <Link 
                    to='/herb-form'
                    className={isSearch ? 'to-herb-form-btn show': 'to-herb-form-btn'}        
                    data-tip="Add New Herb" 
                    data-for="add-herb-tooltip" 
                    target="_blank" 
                    rel="noopener noreferrer"
                 >
                    <i className="fas fa-plus"></i>
                </Link>

                {isSearch && <ReactTooltip id="add-herb-tooltip" place="left"  effect="solid"  /> }

                {showCard && 
                    <>
                        {isMobile 
                            ? <HerbCardMobile showCard={showCard}  setShowCard={setShowCard} /> 
                            : <HerbCard showCard={showCard}  setShowCard={setShowCard}/> 
                        }
                    </>
                }
            </div>
        </>
   
    )
}

export default Home
