import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HerbList from '../components/herbs/HerbList';
import Home from '../components/pages/Home'
import HerbState from '../context/herb/herbState';
import AlertState from '../context/alert/alertState';
import Alert from '../components/layout/Alert';
import Recipes from '../components/user/Recipes';
import Search from '../components/user/Search';
import HerbForm from '../components/herbs/HerbForm';

const Routes = () => {

    const loaderContainer = document.querySelector('.loader-container')
    const recipesQuery = localStorage.getItem('query')
  
    const [showCard, setShowCard] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
  
    useEffect(()=> {
      if(loaderContainer){
        loaderContainer.classList.add('finish')
      }
    },[loaderContainer])

  return (
    <Router>
    <>
      <HerbState>
        <AlertState>
          <Alert />
          <Route exact path="/">
            <Home showCard={showCard} setShowCard ={setShowCard} isSearch={isSearch} setIsSearch={setIsSearch} />
          </Route>
          <Route path="/recipes">
            <Recipes showCard={showCard} setShowCard ={setShowCard} recipesQuery={recipesQuery} />
          </Route>
          <Route path="/search">
            <Search showCard={showCard} setShowCard ={setShowCard} isSearch={isSearch} setIsSearch={setIsSearch}  />
          </Route>
          <Route path="/herb-form">
            <HerbForm />
          </Route>
          <Route path="/herb-list">
            <HerbList />
          </Route>
        </AlertState>
      </HerbState>
    </>
  </Router>

  )
}

export default Routes