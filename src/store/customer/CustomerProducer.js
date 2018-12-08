import {
  FIND_CUSTOMER,
  DELETE_CUSTOMER
} from './CustomerAction'


let initState = {
  isLoading:false,
  status:'',
  customers:{}
}
export default function(state = initState,action){
  switch(action.type){
    case FIND_CUSTOMER:
      switch(action.status){
        case "success":
          return {
            ...state,
            isLoading:false,
            status:action.status,
            customers:action.payload
          }
        default :{
          return {
            ...state,
            status:action.status
          };
        }
      }
    case DELETE_CUSTOMER:
      switch(action.status){
        case "isLoading":
          return {
            ...state,
            isLoading:true
          };
        default :
          return {
            ...state,
            isLoading:false,
            status:action.status
          }
      }
    default:
      return state;
  }
}