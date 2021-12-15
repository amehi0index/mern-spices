import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import HerbState from './context/herb/herbState';
import AlertState from './context/alert/alertState';
import Recipes from './components/user/Recipes';
import Search from './components/user/Search';
import HerbForm from './components/herbs/HerbForm';
import HerbList from './components/herbs/HerbList';
import './App.css';

const App = () => {

  const recipesQuery = localStorage.getItem('query')

  const[showCard, setShowCard] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  return (
    <Router>
      <>
        <HerbState>
          <AlertState>
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

export default App;
