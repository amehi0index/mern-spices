import React, { useEffect, useState, useCallback }from 'react'
import SkeletonCards from './SkeletonCards'
import RecipeCards from './RecipeCards'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../layout/Header'

const Recipes = ({ showCard, setShowCard, recipesQuery }) => {
    
    let url = `/api/recipes?q=${recipesQuery}`
 
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const [pageTitle, setPageTitle] = useState('')
    const history = useHistory()

    const getData = useCallback(async () => {
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }

       const res = await axios.get(url, config)

       const recipes =  res.data.hits.map(r=>{
    
            const recipeData = {
                img: r.recipe.image,
                ingredients: r.recipe.ingredients,
                title: r.recipe.label,
                cuisine: r.recipe.cuisineType,
                link: r.recipe.shareAs,
                time: r.recipe.totalTime,
                servings: r.recipe.yield,
                calories: r.recipe.calories
            }
            return recipeData
        })
    
        setRecipes(recipes)
        setIsLoading(false)
      }, [url])

    useEffect(() => {

        getData()

        setPageTitle(()=> {

            if(recipesQuery !== null && recipesQuery !== undefined){

                const titleArray = recipesQuery.split(' ')
        
                const newArr =  titleArray.map(str => {
                    return str.charAt(0).toUpperCase() + str.slice(1)
                })
            
                newArr.splice(-1, 0, 'and')
                const newTitle = newArr.join(' ')
            
                return newTitle
            }
        })

        document.body.style.overflowY= "scroll"
      
    }, [recipesQuery, pageTitle, recipes, setShowCard, history, setIsLoading, setRecipes, setPageTitle, getData ])

    return (
        <>
            <Header />
            <div className ='recipes-container' >
                <h1 className="recipes-page-title">{pageTitle} Recipes</h1>
                {isLoading 
                    ? <SkeletonCards recipes={recipes} />
                    : <RecipeCards recipes={recipes} />
                }
            </div>
        </>
    )

}

export default Recipes
