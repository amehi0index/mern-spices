import React, { useContext, useRef, useEffect } from 'react'
import HerbContext from '../../context/herb/herbContext'
import { Link } from 'react-router-dom'


const HerbListFilter = () => {

    const herbContext = useContext(HerbContext)
    const { filtered,  filterHerbs, clearFilter, } = herbContext

    const text = useRef('')

    useEffect(() => {
        if(filtered === null){
            text.current.value =''
        }
    },[filtered])

    const onChange = (e) => {
        if (text.current.value !== ''){
            filterHerbs(e.target.value)
        }else{
            clearFilter()
        }
    }

    return (
        <div className="herb-list-filter">   
             <Link to='/herb-form' className="herb-list-back-btn"  >
              <i class="fas fa-chevron-left"></i>
            </Link>
            <input ref={text} type="text" placeholder="Search For Herb By Name"  className="herb-list-input" onChange={onChange} />
            <i className="fas fa-search herb-list-icon"></i>
        </div>   
    )
}

export default HerbListFilter
