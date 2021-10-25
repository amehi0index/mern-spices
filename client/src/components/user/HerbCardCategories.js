import React, { useState, useContext, useEffect, useRef } from 'react'
import HerbContext from '../../context/herb/herbContext'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import HerbCardMobile from '../user/HerbCardMobile'
import { useMediaQuery } from 'react-responsive'
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

    const [isActive, setIsActive] = useState(false)

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
        const query = `${herbName.toLowerCase()} ${foodName}`

        setShowFoodInfo(true)
        setActiveIndex(index)

        setFoodTitle(e.target.id)
        setFoodContent(cat.content)
        
        if(foodTitle === e.target.id){
            setShowFoodInfo(!showFoodInfo)
        }

      
        //console.log(query)
        getRecipesQuery(query)
    }

    const getIconClassName = (index) => {

        if(showFoodInfo && activeIndex  === index ){
            return 'active'
        }else if(showFoodInfo){
            return 'switch-clr'
        }
    }

    /*const toolTipEvent = () => {
        if(showFoodInfo && activeIndex  === index ){
            return 'click'
        }else{
            return
            ''
        }
    }*/
   /* const recipesOnClick = () => {
        setShowCard(false)
        history.push('/recipes/')
    }*/

   function formatCategory(category){

        if( category != null && category.length > 1 ){
            const formattedArray =  category.map(c => {
                return  c.charAt(0).toUpperCase() + c.slice(1)
        }).join(', ')
    
        return formattedArray
        }else if(category.length === 1 ){

            const categoryString = category[0]
            const newCategoryArr = categoryString.split(',')

            const formattedArray =  newCategoryArr.map(c => {
                 return  c.charAt(0).toUpperCase() + c.slice(1)
            }).join(', ')

            return formattedArray
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

