import request from "@/utils/request";

const BASE_URL = 'http://localhost:8888';

request.get(BASE_URL+"/db.json").then(response => {
    console.log("get1",response.data);
    console.log("VUE_APP_BASE_API",process.env.VUE_APP_BASE_API);
    console.log("VUE_APP_SERVICE_URL",process.env.VUE_APP_SERVICE_URL);
}).catch( error => {
    console.log(error);
});

request({
    url: BASE_URL+"/employee/getList",
    method: 'get'
}).then(response=>{
    console.log("get2",response.data)
}).catch(error=>{
    console.log(error)
})

export default{
    getList(){
        const req=request({
            url: BASE_URL+"/db.json",
            method: "get"
        });
        return req;
    }
}
