import React, { useState, useContext, useEffect, useRef } from 'react'
import HerbContext from '../../context/herb/herbContext'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import formatItem from '../../util/formatItem'
import formatCategory from '../../util/formatCategory'

const HerbCardCategories = ({ categories, showFoodInfo, setShowFoodInfo, herbName, setShowCard }) => {

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const herbContext = useContext(HerbContext)
    const { getRecipesQuery } = herbContext

    const [foodTitle, setFoodTitle] = useState('')
    const [foodContent, setFoodContent] = useState('')
    const [categoriesArr, setCategoriesArr] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const iconsRef = useRef(null)

    useEffect(() => {

        let cats = Object.keys(categories).map(key => (
            {
                id: key,
                category: key, 
                content: formatCategory(categories[key]), 
                isActive: false
            }
        ))

        setCategoriesArr(cats)

    }, [setCategoriesArr, categories])

    const onClick = (e, cat, index) => {

        const foodName = e.target.id
        const comboQuery = `spice blend`
        let foodContentString = formatItem(cat.content)
        let query
        
        if (foodName === "misc"){
            query = `${herbName.toLowerCase()}` 
        }else if (foodName === "combos" ){
            query = `${herbName.toLowerCase()} ${comboQuery}`
        } else{
            query = `${herbName.toLowerCase()} ${foodName}`
        }
        
        setShowFoodInfo(true)
        setActiveIndex(index)
        setFoodTitle(e.target.id)
        
        setFoodContent(() => {
            if (foodContentString !== undefined){
                return foodContentString
            }else{
                return `No Information Available for this Category.`
            }
        })

        if(foodTitle === e.target.id){
            setShowFoodInfo(!showFoodInfo)
        }

        getRecipesQuery(query)
    }

    const getIconClassName = (index) => {

        if(showFoodInfo && activeIndex  === index ){
            return 'active'
        }else if(showFoodInfo){
            return 'switch-clr'
        }
    }

    return (
        <>
            <div className={!showFoodInfo ? 'food-categories'  : 'food-categories switch-bg'}> 
                <div className="food-icons">
                 {categoriesArr.map((cat, index) => (
                     <>
                        <div 
                            ref={iconsRef} 
                            key={index} 
                            className={getIconClassName(index, cat.isActive)} 
                            id={cat.id}  
                            onClick={(e)=> onClick(e, cat, index)}
                        >{!isMobile && cat.category}</div>
                      </>
                 ))}
                </div>
                <div 
                    className={showFoodInfo ? 'food-info show' : 'food-info'}
                    data-tip="Click Highlighted Tab to Close" 
                    data-for="active-icon-tooltip"
                    data-offset=""
                >
                    <h3 className='title'>{foodTitle}</h3> 
                    <p className='description'>{foodContent}</p>
                     
                    <Link to='/recipes/'  className="food-info-btn" target="_blank" rel="noopener noreferrer">
                        Recipes
                    </Link>
                </div> 
                <ReactTooltip id="active-icon-tooltip"  effect="solid" />
            </div>
        </>
    )
}

export default HerbCardCategories


