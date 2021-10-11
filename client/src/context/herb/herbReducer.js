import {
    GET_HERBS,
    ADD_HERB,
    DELETE_HERB,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_HERB,
    FILTER_HERBS,
    GET_HERB,
    GET_RECIPES_QUERY,
    CLEAR_FILTER,
    CLEAR_HERBS,
    HERB_ERROR
    } from '../types';

    export default (state, action) => {
        switch(action.type){
            case GET_HERBS:
                return{
                    ...state,
                    herbs: action.payload,
                    loading: false
                }
            case ADD_HERB: 
                return{
                 ...state,
                herbs: [ ...state.herbs, action.payload ],
                loading: false
                }
            case UPDATE_HERB:
                return{
                    ...state,
                    herbs: state.herbs.map(herb => 
                        herb._id === action.payload._id ? action.payload : herb
                    ),
                    loading: false
                }
            case DELETE_HERB: 
                return{
                    ...state,
                    herbs: state.herbs.filter(herb => herb._id !== action.payload),
                    loading: false
                }
            case CLEAR_HERBS:
                return{
                    ...state,
                    herbs: null,
                    filtered: null,
                    error: null,
                    current: null,
                    loading: false
                }
            case SET_CURRENT:
                return{
                    ...state,
                    current: action.payload,
                    loading: false
                }
            case CLEAR_CURRENT:
                return{
                    ...state,
                    current: null,
                    loading: false
                }
            case FILTER_HERBS:
                return{
                    ...state,
                    filtered: state.herbs.filter(herb => {
                        const regex = new RegExp(`^${action.payload}`, 'gi') 
                        return herb.name.match(regex)
                    }),
                    loading: false
                }
            case GET_HERB:
                return{
                    ...state,
                    herb: state.herbs.find(herb => {
                        const regex = new RegExp(`^${action.payload}`, 'gi') 
                        return herb.name.match(regex)
                    }),
                    loading: false
                }
            case GET_RECIPES_QUERY:
                localStorage.setItem('query', action.payload)
                return{
                    ...state,
                    ...action.payload,
                    loading: false    
                }
            case CLEAR_FILTER:
                return{
                        ...state,
                        filtered: null,
                        loading: false
                }
            case HERB_ERROR:
                return{
                    ...state,
                    error: action.payload,
                }
            default: 
                return state
        }
    }