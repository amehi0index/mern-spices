import React, { useReducer } from 'react'
import axios from 'axios'
import HerbContext from './herbContext'
import herbReducer from './herbReducer'
import {
    GET_HERBS,
    ADD_HERB,
    DELETE_HERB,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_HERB,
    FILTER_HERBS,
    CLEAR_FILTER,
    CLEAR_HERBS,
    HERB_ERROR,
    GET_HERB,
    GET_RECIPES_QUERY
    } from '../types';

const HerbState = (props) => {

    const initialState = {
        herb: null,
        herbs: [],
        current: null,
        filtered: null,
        recipesQuery: null,
        loading: true,
        error: null,
    }

    const [state, dispatch] = useReducer(herbReducer, initialState)
   
    //Get herbs
    const getHerbs = async () => {

        try {
            const res = await axios.get('/api/herbs')
            dispatch({
                type: GET_HERBS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: HERB_ERROR,
                payload: err.response.msg
            })
        }

    }

    const addHerb =  async (herb) => {

        const config = {      //use when sending data
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/herbs', herb, config)

            dispatch({
                type: ADD_HERB,
                payload: res.data //response from server is new added herb
            })
        } catch (err) {
            dispatch({
                type: HERB_ERROR,
                payload: err.response.msg
            })
        }
           
    }

    //Delete herb
    const deleteHerb =  async (id) => {
        try {
           await axios.delete(`/api/herbs/${id}`)

            dispatch({
                type: DELETE_HERB,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: HERB_ERROR,
                payload: err.response.msg
            })
        }
    }

    
    //Update herb
    const updateHerb = async (herb) => {
       
        const config = {      //use when sending data
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/herbs/${herb._id}`, herb, config)

            dispatch({
                type: UPDATE_HERB,
                payload: res.data //response from server is updated herb
            })
        } catch (err) {
            dispatch({
                type: HERB_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Clear herbs on logout
    const clearHerbs = () => {
        dispatch({
            type: CLEAR_HERBS,
        })
    }

    //Set Current herb
    const setCurrent = (herb) => {
        dispatch({
            type: SET_CURRENT,
            payload: herb
        })
    }


    //Clear Current herb
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT,
        })
    }

    //Filter herbs
    const filterHerbs = (text) => {
        dispatch({
            type: FILTER_HERBS,
            payload: text
        })
    }

    //Get Herb
    const getHerbName = (text) => {
        dispatch({
            type: GET_HERB,
            payload: text
        })
    }

    const getRecipesQuery= (query) => {
        dispatch({
            type: GET_RECIPES_QUERY,
            payload: query
        })
    }

    //Clear Filter
    const clearFilter= () => {
        dispatch({
            type: CLEAR_FILTER,
        })
    }

    return (

        <HerbContext.Provider value={{
            herb: state.herb,
            herbs: state.herbs,
            current: state.current,
            filtered: state.filtered,
            recipesQuery: state.recipesQuery,
            loading: state.loading,
            error: state.error,
            addHerb,
            deleteHerb,
            setCurrent,
            clearCurrent,
            updateHerb,
            filterHerbs,
            getHerbName,
            getRecipesQuery,
            clearFilter,
            getHerbs,
            clearHerbs
        }}>
           {props.children} 
        </HerbContext.Provider>
    )
}

export default HerbState;