import React, { useState, useEffect,  useContext, useRef } from 'react'
import HerbContext from '../../context/herb/herbContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../layout/Header'
import ReactTooltip from 'react-tooltip';

const HerbForm = () => {

    const [image, setImage] = useState('')
    const [showFileName, setShowFileName] = useState(false)
    const fileRef = useRef('')

    const herbContext = useContext(HerbContext)
    const { addHerb, updateHerb, current, clearCurrent } = herbContext

    //Prefill form for editing
        useEffect (() => {
            if(current !== null){
                setHerb(current)
            }else{
                setHerb({
                    name: '',
                    other: '',
                    description: '',
                    cuisines: '',
                    origin: '',
                    substitutes:'',
                    img:'',
                    categories: {
                        grains: [''],
                        meats: [''],
                        seafood: [''],
                        vegetables: [''],
                        beverages: [''],
                        soups: [''],
                        desserts: [''],
                        misc: [''],
                        combos: ['']
                    }
                })
            }
        }, [herbContext, current])


    const [herb, setHerb] = useState({
        name: '',
        other: '',
        description: '',
        cuisines: '',
        origin: '',
        substitutes:'',
        img:'',
        categories: {
            grains: [''],
            meats: [''],
            seafood: [''],
            vegetables: [''],
            beverages: [''],
            soups: [''],
            desserts: [''],
            misc: [''],
            combos: ['']
        }
    })

    const { name, other, description, cuisines, origin, substitutes, img, categories } = herb
    const { grains, meats, seafood, vegetables, beverages, soups, desserts, misc, combos } = categories

    const onChange = (e) => setHerb({...herb, [e.target.name]: e.target.value })  
    
    const onCategoryChange = (e) => {
        const name = e.target.name 
        setHerb({...herb, categories: {...categories, [name]: e.target.value}})
    }

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('img', file)
        setShowFileName(true)

        try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          } 
          
          const  { data } = await axios.post('/api/herbs/upload', formData, config)
          setImage(data) 
          console.log(herb)
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(current === null){ 
            if(herb){
                herb.img = image
                console.log(herb)
                addHerb(herb)
            } 
        }else{
            herb.img = image
            updateHerb(herb)
        }
        clearAll()
    }

    const clearAll = () =>{
        clearCurrent()
        fileRef.current.value = ''
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        })
    }

    return (
        <>
            <Header />
            <div className="form-container">
                <form onSubmit={onSubmit} encType="multipart/form-data">

                    <h1 className ="herb-form-title">{current ? 'Edit ' : 'Add '} Herb or Spice</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange}  autoComplete="off" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="other">Aliases</label>
                        <input type="text" name="other" value={other} onChange={onChange}  autoComplete="off"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={description} onChange={onChange}autoComplete="off" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Cuisines</label>
                        <input type="text" name="cuisines" value={cuisines} onChange={onChange} autoComplete="off"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="origin">Origin</label>
                        <input type="text" name="origin" value={origin} onChange={onChange} autoComplete="off"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="substitutes">Substitutes</label>
                        <input type="text" name="substitutes" value={substitutes} onChange={onChange}autoComplete="off" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Image</label>
                        <input 
                            ref={fileRef}
                            type="file" 
                            name="img" 
                            className={showFileName ? 'form-control-file show' : 'form-control-file' }
                            onChange={uploadFileHandler} 
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group categories-title">
                        <h4 htmlFor="food-categories">Food Categories</h4>
                    </div>

            
                    <div className ="categories-group">
                    
                        <div className="categories-foods">
                            <div>
                                <label htmlFor="grains">Grains</label>
                                <input type="text" name="grains" value={grains} onChange={onCategoryChange} autoComplete="off"/>
                            </div>
                            
                            <div>
                                <label htmlFor="meats">Meats</label>
                                <input type="text" name="meats" value={meats} onChange={onCategoryChange} autoComplete="off"/>
                            </div>

                            <div>
                                <label htmlFor="seafood">Seafood</label>
                                <input type="text" name="seafood" value={seafood} onChange={onCategoryChange} autoComplete="off"/>
                            </div>

                            <div>
                                <label htmlFor="vegetables">Vegetables</label>
                                <input type="text" name="vegetables" value={vegetables} onChange={onCategoryChange}  autoComplete="off"/>
                            </div>
                            
                            <div>
                                <label htmlFor="beverages">Beverages</label>
                                <input type="text" name="beverages" value={beverages} onChange={onCategoryChange} autoComplete="off" />
                            </div>

                            <div>
                                <label htmlFor="soups">Soups</label>
                                <input type="text" name="soups" value={soups} onChange={onCategoryChange}  autoComplete="off"/>
                            </div>

                            <div>
                                <label htmlFor="desserts">Desserts</label>
                                <input type="text" name="desserts" value={desserts} onChange={onCategoryChange} autoComplete="off"/>
                            </div>

                            <div>
                                <label htmlFor="combos">Combinations</label>
                                <input type="text" name="combos" value={combos} onChange={onCategoryChange}  autoComplete="off"/>
                            </div>
                            
                            <div>
                                <label htmlFor="misc">Miscellaneous</label>
                                <input type="text" name="misc" value={misc} onChange={onCategoryChange} autoComplete="off"/>
                            </div>

                        </div>

                    </div>

                    <div>
                        <input type="submit" value={current ? 'Update Herb' : 'Add Herb'} className ="herb-form-btn" autoComplete="off" />
                    </div>
                </form>

                <div className="herb-form-float-btns">
                    <button className="clear-form-float-btn" data-tip="Clear Form" data-for="herb-form-tooltip"  onClick={clearAll}> 
                        <i className="fas fa-minus"></i>
                    </button>
                    <Link to='/herb-list' className="herb-list-float-btn"  data-tip="Get List" data-for="herb-form-tooltip" rel="noopener noreferrer">
                        <i className="fas fa-list"></i>
                    </Link>
                    <ReactTooltip id="herb-form-tooltip"  place="left"  effect="solid" />
                </div>
        </div>
    </>
    )
}

export default HerbForm


/*{current && (
    <div>
        <button onClick={clearAll}>Clear</button>
    </div>
)}*/