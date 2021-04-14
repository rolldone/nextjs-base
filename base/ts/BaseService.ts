import axios from 'axios';
import config from '@config';

const rememberRequest : any = {};

export default class BaseService {
  newHeaders: {}
  headers: {
    "X-CSRF-TOKEN": null,
    Authorization: "Bearer"
  }
  preventDuplicateRequest : {}
  constructor() { }
  /* Aditional function */
  objectToFormData(props: any): FormData {
    let formData = null;
    formData = new FormData();
    for (var a in props) {
      if (props[a] != null) {
        formData.append(a, props[a]);
      }
    }
    return formData;
  }
  setUrl(urlString: String, array: Array<any>) {
    for (var a = 0; a < array.length; a++) {
      for (var key in array[a]) {
        if (urlString.match(key)) {
          var re = new RegExp(key, "g");
          urlString = urlString.replace(re, array[a][key]);
        }
      }
    }
    return urlString;
  }
  simpleInitData(object: any, overrides: any) {
    let funcs: any = {};
    let newObject: any = {};
    for (var key in object) {
      if ({}.toString.call(object[key]) == '[object Function]') {
        funcs[key] = object[key];
      } else {
        newObject[key] = object[key];
      }
    }
    newObject = JSON.stringify(newObject);
    newObject = JSON.parse(newObject);
    newObject = {
      ...newObject,
      ...overrides,
    };
    for (var key in funcs) {
      newObject[key] = funcs[key].bind(newObject);
    }
    return newObject;
  }
  jsonParseUrl(whatUrl: string = window.location.href) {
    let theUrl = global.Arg(whatUrl);
    let theJSON: any = {};
    theJSON["query"] = theUrl.query();
    theJSON["hash"] = theUrl.hash();
    return theJSON;
  }
  jsonToQueryUrl(url: String, whatObject: {}, action: String) {
    let theArg = global.Arg();
    if (action == "hash") {
      theArg.urlUseHash = true;
    }
    let theUrl = theArg.url(url, whatObject);
    return theUrl;
  }
  getHeaders() {
    if (this.headers == undefined) return null;
    return this.headers;
  }
  setNewHeaders(props: {}) {
    this.newHeaders = props;
  }
  getNewHeaders() {
    if (this.newHeaders == undefined) return null;
    return this.newHeaders;
  }
  setPreventDuplicate(prevent = false) {
    this.preventDuplicateRequest = prevent;
  }
  isPreventDuplicate() {
    return this.preventDuplicateRequest || false;
  }
  getData(url : String, queryString : {}) {
    let self = this;
    return new Promise(async function (resolve) {
      try{
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        let theArg = global.Arg();
        let query = theArg.query();
        query = Object.assign(query, queryString);
        let theUrl = theArg.url(url, query);
        let axiosData : any = {
          method: 'get',
          url: theUrl,
          cancelToken : source.token
        }
        let newHeaders = self.getNewHeaders();
        if(newHeaders != null){
          /* Replace with new headers */
          axiosData.headers = newHeaders;
        }
        /* Cancel if get duplicate request like debounce */
        if(self.isPreventDuplicate() == true){
          if(rememberRequest[theUrl] != null){
            rememberRequest[theUrl].cancel();
          }
        }
        rememberRequest[theUrl] = source; 
        let res = await axios(axiosData);
        resolve(res);
      }catch(ex){
        resolve({
          status: "error",
          data: ex
        });
      }
    });
  }
  postData(url : string, formData : FormData) {
    let self = this;
    return new Promise(async function (resolve, reject) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      try{
        let axiosData : any = {
          method: 'post',
          url: url,
          data: formData,
          cancelToken : source.token
        }
        let newHeaders = self.getNewHeaders();
        if(newHeaders != null){
          /* Replace with new headers */
          axiosData.headers = newHeaders;
        }
        /* Cancel if get duplicate request like debounce */
        if(self.isPreventDuplicate() == true){
          if(rememberRequest[url] != null){
            rememberRequest[url].cancel();
          }
        }
        rememberRequest[url] = source; 
        let res = await axios(axiosData);
        resolve(res);
      }catch(ex){
        resolve({
          status: "error",
          data: ex
        });
      }
    });
  }
  getScript(url : String, queryString : {}) {
    let self = this;
    return new Promise(async function(resolve, reject) {
      
      resolve({
        status: "error",
        data: null
      });
    });
  }
  validURL(str : string) {
    let pattern : RegExp = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  existDomain(str : string){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'); // OR ip (v4) address
    return !!pattern.test(str);
  }
  setApiRoute(route : any) {
    var newRoute : any = {};
    var baseHttp = (config as any).API_URL;
    for (var a in route) {
      if(this.existDomain(route[a]) == true){
        newRoute[a] = route[a];
      }else{
        newRoute[a] = baseHttp + route[a];
      }
    }
    global.routeApi = (function(api_store_list : any) {
      return function(whatName : string) {
        if (api_store_list[whatName] == null) {
          return "";
        }
        return api_store_list[whatName];
      };
    })(newRoute);
    return (route = newRoute);
  }
  setPrivilegeMap(privileges : {}) {
    global.privilege_store_list = privileges;
    return privileges;
  }
  setLocalStorage(whatString : string, props : any){
    let self = this;
    let currentData : any = localStorage.getItem(whatString)||null;
    console.log("currentData -> ", currentData);
    let theValue = localStorage.getItem(whatString);
    switch(true){
      case theValue == null:
      case (theValue[0] != "{" && theValue[0] != "["):
        return localStorage.setItem(whatString,JSON.stringify(props));
    }
    currentData = JSON.parse(currentData);
    if(Object.keys(currentData).length == 0){
      window.localStorage.setItem(whatString,JSON.stringify(props));
      return;
    }
    window.localStorage.setItem(whatString,JSON.stringify({
      ...currentData,
      ...props,
    }));
  }
  getLocalStorage(whatString : string){
    let theValue = localStorage.getItem(whatString);
    try{
      return JSON.parse(theValue);
    }catch(ex){
      return theValue;
    }
  }
}