import {
  UPDATE_CURRENT_PAGE
} from './GlobalAction'

const initState = {
  currentPage:'/book'
}
export default function(state=initState,action){
  switch(action.type){
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage:action.payload
      };
    default :
      return state;
  }
}