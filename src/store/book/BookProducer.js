import {
  FIND_BOOK
} from './BookAction'


let initState = {
  isLoading:false,
  status:'',
  books:{}
}
export default function(state = initState,action){
  switch(action.type){
    case FIND_BOOK:
      switch(action.status){
        case "success":
          return {
            ...state,
            isLoading:false,
            status:action.status,
            books:action.payload
          }
        default :{
          return {
            ...state,
            status:action.status
          };
        }
      }
    default:
      return state;
  }
}