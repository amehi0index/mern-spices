
import { useState, useRef, useEffect, useContext } from 'react'
import HerbContext from '../../context/herb/herbContext'
import AlertContext from '../../context/alert/alertContext';
import { useClickAway } from 'react-use';
import SearchResults from './SearchResults'

const Search = ({ isSearch, setIsSearch, showCard, setShowCard, setShowResults, showResults }) => {

    const herbContext = useContext(HerbContext)
    const { filtered, filterHerbs, getHerbName, clearFilter, herbs, getHerbs } = herbContext

    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    const textref = useRef(null)
    const input = useRef(null)
    const herbListRef = useRef(null)
   
    // const [text, setText] = useState('Enter Herb or Spice Name')
    const [text, setText] = useState('')
    const [homeBtnVal, setHomeBtnVal] = useState('search')
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        //input.current.focus()
    },[text, filtered])

    const onChange = async (e) => {
        setText(e.target.value)
        setShowResults(true)
        await getHerbs()
        if(e.target.value !== ''){
            filterHerbs(e.target.value)
        }
    }

    const handleSelect = (e) => { 
     
        let item
        if (e.code === 'ArrowDown' && selected < filtered.length - 1) {
            e.preventDefault()
            setSelected(selected + 1)
            item = filtered[selected + 1]
            setText(item.name)
        }
        else if (e.code === 'ArrowUp') {
            e.preventDefault()
            if(selected > 0){
                setSelected( selected - 1)
                item = filtered[selected - 1]
                setText(item.name)
            }
        } 

        if(e.code === 'Enter'){
           onSubmit(e)
        }
    }

    const onClick = () => {
        setText('')
        setShowResults(false)
        setShowCard(false)
        setIsSearch(false)
    }

    const onSubmit = e => {
        e.preventDefault()  

        let match = herbs.find(h => h.name.toLowerCase() === text.toLowerCase())

        if (text ===''){
            setAlert('Please Enter an Herb or Spice', 'orange') 
        }else if(!match || match === undefined){
            setAlert('Herb or Spice Name Not Found.', 'primary')
        }else{
            getHerbName(text)
            setText('');
            clearFilter()
            input.current.blur()
        }
    }

    const onFocus = ()=>{
       setShowCard(false)
       setSelected(0)
    }

    useClickAway(herbListRef, () => {
        setShowResults(false)
    })

    if(isSearch){
      setTimeout(() => {
          setHomeBtnVal('back')
        }, 2000)
    }
    
    return (
        <div>
            <div className={ isSearch ? 'search' : 'search hidden'}>
                <div className="show-input">     
                    <div className="input-results">
                        <div className={ isSearch ?'input-span show' : 'input-span'} >
                            <button className={ isSearch ? 'home-btn hide' : 'home-btn'} onClick={onClick}>
                                <span className={isSearch ? 'back-arrow show' : 'back-arrow'}>
                                    <i className="fas fa-chevron-left"></i>
                                </span>
                                <span ref={textref} className="search-text-span">{homeBtnVal}</span>
                            </button>

                            <button className={ isSearch ? 'home-btn-mobile hide' : 'home-btn-mobile'} onClick={onClick}>
                                    <i className="fas fa-chevron-left"></i>
                            </button>

                            <form onSubmit={onSubmit}>
                                <input  
                                    ref={input}
                                    id="input" 
                                    type="text" 
                                    autoFocus
                                    autoComplete="off" 
                                    className={ isSearch ? 'slide' : ''}  
                                    value={text}
                                    onKeyDown={handleSelect}
                                    onChange={onChange} 
                                    onFocus={onFocus}
                                    required
                                />

                                <button type="submit" className={ isSearch ? 'search-icon-btn show-icon' : 'search-icon-btn'} >
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>

                        </div>

                        {text !== ''  && 
                            <div className = "herb-list-span">
                                <div className="space-1"></div>
                                <div className="herb-list-container">
                                    {showResults &&
                                        <ul ref={herbListRef} className="herb-list">
                                            <SearchResults  setText={setText} text={text} selected={selected} handleSelect={handleSelect} setSelected={setSelected} showResults={showResults} />
                                        </ul>
                                    }
                                    <div className="space-2"></div>
                                </div>
                              
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
   
    )
}

export default Search

