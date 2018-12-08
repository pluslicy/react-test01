import axios from 'axios'
import qs from 'qs'
// 全局配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data,{arrayFormat: 'repeat' });
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const FIND_CUSTOMER = 'FIND_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const BATCH_DELETE_CUSTOMER = 'DELETE_CUSTOMER';


function findCustomerAction(status,payload){
  return {
    type:FIND_CUSTOMER,
    status,
    payload
  }
}

function deleteCustomerAction(status){
  return {
    type:DELETE_CUSTOMER,
    status
  }
}

// 参数params {page,pageSize}
export function findCustomer (params){
  return (dispatch)=>{
    dispatch(findCustomerAction('isLoading'));
    let url = 'http://120.78.164.247:8088/customer/findAllNormalCustomer';
    axios.get(url,{params})
    .then(({data:result})=>{
      dispatch(findCustomerAction("success",result.data))
    })
  }
}

export function deleteCustomer(id){
  return (dispatch)=>{
    dispatch(deleteCustomerAction('isLoading'))
    let url = 'http://120.78.164.247:8088/customer/deleteCustomerById';
    return axios.get(url,{params:{id}})
    .then(({data:result})=>{
      if(result.status === 200){
        dispatch(deleteCustomerAction('success'))
        dispatch(findCustomer({page:0,pageSize:100}))
      } else {
        dispatch(deleteCustomerAction('error'))
      }
    })
  }
}

export function saveOrUpdateCustomer(customer){
  return dispatch => {
    let url = 'http://120.78.164.247:8088/customer/saveOrUpdateCustomer'
    return axios.post(url,customer)
    .then(()=>{
      dispatch(findCustomer({page:0,pageSize:100}))
    })
  }
}