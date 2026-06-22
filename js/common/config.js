axios.defaults.baseURL='http://localhost:10010'
Vue.prototype.$http = axios

// axios前置拦截器  每次请求都携带token
axios.interceptors.request.use(config=>{
    //携带token
    let token =  localStorage.getItem("token");
    if(token){
        config.headers['token']=token;
    }
    return config;
},error => {
    Promise.reject(error);
})

// axios后置拦截器，接收登录拦截返回的信息，跳转到登录页面
axios.interceptors.response.use(result=>{
    let data = result.data;
    if(data.code=="-10000"){
        // 删除localstorage数据
        localStorage.removeItem("token")
        // 跳转到登录页面
        location.href="/login.html"
    }
    return result;
},error => {
    Promise.reject(error);
})