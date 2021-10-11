import { useRef, useEffect, useContext } from 'react'
import HerbContext from '../../context/herb/herbContext'

const SearchResults = ({ setText, selected, setSelected, showResults, handleSelect }) => {

    const herbContext = useContext(HerbContext)
    const { filtered, getHerbs } = herbContext

    const liref = useRef(null)

    useEffect(() => {
        getHerbs() 
       /* if(selected === 0){
            liref.current.focus()
        }*/
    }, [selected, getHerbs])

    function onClick (herbName, index){
       setSelected(index)
       setText(herbName)
    }

    return (
        <>
            {showResults && filtered.length > 0 && filtered.map((herb, index)=> (
                <li 
                    tabIndex="0"
                    ref={liref} 
                    key={herb._id}  
                    onClick={()=>onClick(herb.name, index)}
                    onKeyDown={(e)=>handleSelect(e)}
                    className={selected === index ? 'current' : ''}>  {herb.name}
                </li>
            ))}
        </>
    )
}

export default SearchResults