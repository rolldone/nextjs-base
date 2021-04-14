import Register from "../interface/Register";
import BaseService from "./BaseService";
export default class AuthService extends BaseService{
  login(props : any){

  }
  async register(props : [Register,null]){
    console.log('aaaaaaaaaaaa',global.Arg());
    // this.jsonToQueryUrl("",{},"");
    let resData = await this.postData("",(new FormData()));
    console.log('resData',resData);
  }
  forgotPassword(){

  }
  activateUser(){

  }
}