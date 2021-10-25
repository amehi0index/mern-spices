import React, { useContext, useEffect } from 'react'
import HerbContext from '../../context/herb/herbContext'
import HerbItem from './HerbItem'
import Header from '../layout/Header'
import HerbListFilter from './HerbListFilter'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'

const HerbList = () => {

  const herbContext = useContext(HerbContext)
  const { herbs, filtered, getHerbs, loading } = herbContext

  useEffect(() => {
    getHerbs()
     //eslint-disable-next-line
 }, [])

return ( 
  <>
    {loading 
      ? <Loader />
      : <>
          <Header />
          <div className="herb-list-cards-container">
            <HerbListFilter />
            <div className="herb-list-cards">
              { herbs && ( 
                <>  
                  {filtered !== null 
                    ? filtered.map(herb => (<HerbItem key={herb._id} herb={herb} />))
                    : herbs.map(herb => (<HerbItem key={herb._id} herb={herb} />))
                  }
                </>  
              )}
            </div>   
          </div>
        </>
    }
  </>
  )
}

export default HerbList
