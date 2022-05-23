import React from 'react'
import '../../styles/cards.css';

const SkeletonCardItem = () => {
    return (
        <>
            <div class="recipe-card">

                <div class="recipe-card-header">
                        <div class="img-container animated-bg">
                            <img src="" alt="" class="hide"/>
                        </div>
                        <h5 class="recipe-card-title">
                            <span class="animated-bg animated-bg-text"></span>
                            <small class="cuisine animated-bg animated-bg-text"> &nbsp;</small>
                        </h5>
                </div>

                <div class="recipe-card-content">
                    <div class="recipe-card-icons">
                        <div>
                            <span class="animated-bg animated-bg-text">
                                <i class="fas fa-clock hide"></i>
                                <p class="time"></p>
                            </span>
                            <p class="recipe-card-icon-label time-label animated-bg animated-bg-text"></p>
                        </div>

                        <div>
                            <span class="animated-bg animated-bg-text">
                                <i class="fas fa-user hide"></i>
                                <p class="servings"></p>
                            </span>
                            <p class="recipe-card-icon-label servings-label animated-bg animated-bg-text"></p>
                        </div>

                        <div>
                            <span class="animated-bg animated-bg-text">
                                <i class="fas fa-fire hide"></i>
                                <p class="calories"></p>
                            </span>
                            <p class="recipe-card-icon-label calories-label animated-bg animated-bg-text"></p>
                        </div>
                    </div>
                </div>

                <div class="recipe-btn-div">
                    <span class="recipe-card-btn animated-bg"></span>
                </div>

            </div>   
        </>
    )
}

export default SkeletonCardItem
