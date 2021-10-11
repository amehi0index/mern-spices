import React from 'react'
import '../../cards.css';

const RecipeCardItem = ({ recipe }) => {
    return (
        <>
            <div className="recipe-card">

                <div className="recipe-card-header">
                        <div className="img-container ">
                            <img src={recipe.img} alt=""/>
                        </div>
                        <h5 className="recipe-card-title">
                            <a href={recipe.link}>{recipe.title}</a>
                            <small className="cuisine">{recipe.cuisine}</small>
                        </h5>
                </div>

                <div className="recipe-card-content">
                    <div className="recipe-card-icons">
                        <div>
                            <span>
                                <i className="fas fa-clock"></i>
                                <p className="time">{recipe.time}</p>
                            </span>
                            <p className="recipe-card-icon-label">Minutes</p>
                        </div>

                        <div>
                            <span>
                                <i className="fas fa-user"></i>
                                <p className="servings">{recipe.servings}</p>
                            </span>
                            <p className="recipe-card-icon-label">Servings</p>
                        </div>

                        <div>
                            <span>
                                <i className="fas fa-fire"></i>
                                <p>{Math.round(recipe.calories)}</p>
                            </span>
                            <p className="recipe-card-icon-label">Calories</p>
                        </div>
                    </div>
                </div>

                <div className="recipe-btn-div">
                    <a href={recipe.link} className="recipe-card-btn">Get Recipe</a>
                </div>

            </div>   
        </>
    )
}

export default RecipeCardItem