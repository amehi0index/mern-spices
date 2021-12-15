import React from 'react'
import RecipeCardItem from './RecipeCardItem'

const RecipeCards = ({ recipes }) => {
    return (
        <>
            <div className="recipe-cards">
                {recipes.map((recipe, index) => (
                    <RecipeCardItem key={index} recipe={recipe} />
                ))}
            </div>
        </>
    )
}

export default RecipeCards