import React, { useEffect, useState }from 'react'
import SkeletonCards from './SkeletonCards'
import RecipeCards from './RecipeCards'
//
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../layout/Header'

const Recipes = ({ showCard, setShowCard, recipesQuery }) => {
    
    const APP_ID =  process.env.REACT_APP__ID
    const APP_KEY = process.env.REACT_APP_APP_KEY

    let url = `https://api.edamam.com/search?q=${recipesQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
   
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const [pageTitle, setPageTitle] = useState('')
    const history = useHistory()

    useEffect(() => {

        /*window.addEventListener('popstate', (event) => {
            history.push('/')
            setShowCard(false)
            window.location.reload()
        })*/

        //getData()

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
      
    }, [recipesQuery, pageTitle, recipes, setShowCard, history, setIsLoading, setRecipes, setPageTitle])

    async function getData(){

        const config = {      //use when sending data
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }

        const res = await axios.get(url, config)
    
        const recipes =  await res.data.hits.map(r=>{
    
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
    }

    function formatPageTitle (){

        const titleArray = recipesQuery.split(' ')
    
        const newArr =  titleArray.map(str => {
            return str.charAt(0).toUpperCase() + str.slice(1)
        })
    
        newArr.splice(-1, 0, 'and')
        const newTitle = newArr.join(' ')
    
        return newTitle
    }

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
