
import React, { useContext } from 'react'
import HerbContext from '../../context/herb/herbContext'
import { useHistory } from "react-router-dom";

const HerbItem = ({ herb }) => {

    const herbContext = useContext(HerbContext)
    const { deleteHerb, setCurrent, clearCurrent, current } = herbContext
    const {  _id, name, other, description, cuisines, origin, substitutes, categories } = herb
    const { grains, meats, seafood, vegetables, beverages, soups, desserts, combos, misc } = categories

    const history = useHistory()

    const onDelete = () => {
        deleteHerb(_id) 
        clearCurrent()
     }

    const formatCategory = (category) => {

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

    const updateForm = () => {
        setCurrent(herb)
        history.push('./herb-form')
    }

    return (
        <div>
            <div className="herb-list-card">
                <div className="herb-list-card-header">
                    <h2>{name}{' '}</h2>
             
                    <p className="herb-list-card-btns">
                        <button className="herb-list-card-btn" onClick={updateForm}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="herb-list-card-btn" onClick={onDelete}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </p>
                </div>

                <div className="flex-row">
                    <h4>Profile: </h4>
                    <p> {description}</p>
                </div>

                <div className="flex-row">
                    <h4>Aliases: </h4>
                    <p> {other}</p>
                </div>

                <div className="flex-row">
                    <h4>Cuisines: </h4>
                    <p> {cuisines}</p>
                </div>

                <div className="flex-row">
                    <h4>Origin: </h4>
                    <p> {origin}</p>
                </div>

                <div className="flex-row">
                    <h4>Subs: </h4>
                    <p> {substitutes}</p>
                </div>
               
                <ul>
                    <h4 className="flex-row">Food Categories</h4>
                    <li>Grains: {formatCategory(grains)}</li>
                    <li>Meats: {formatCategory(meats)}</li>
                    <li>Seafood: {formatCategory(seafood)}</li>
                    <li>Vegetables: {formatCategory(vegetables)}</li>
                    <li>Beverages: {formatCategory(beverages)}</li>
                    <li>Soups: {formatCategory(soups)}</li>
                    <li>Desserts: {formatCategory(desserts)}</li>
                    <li>Combos: {formatCategory(combos)}</li>
                    <li>Misc: {formatCategory(misc)}</li> 
                </ul>

            </div>
        </div>
    )
}

export default HerbItem
