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


export const FIND_BOOK = 'FIND_BOOK';


function findBookAction(status,payload){
  return {
    type:FIND_BOOK,
    status,
    payload
  }
}


// 参数params {page,pageSize}
export function findBook (params){
  return (dispatch)=>{
    dispatch(findBookAction('isLoading'));
    let url = 'http://120.78.164.247:8088/coatStyle/findAllCoatStyle';
    axios.get(url,{params})
    .then(({data:result})=>{
      dispatch(findBookAction("success",result.data))
    })
  }
}


