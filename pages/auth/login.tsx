// import LoginComponent from "components/front/auth/functions/LoginComponent";
import React from "react";
import AuthService from "../../components/front/auth/services/AuthService";
import Layout from "./Layout";
import dynamic from 'next/dynamic';
import BaseReact from "base/ts/BaseReact";

const LoginComponent = dynamic(
  () => import("components/front/auth/functions/LoginComponent"),
  { ssr: true }
)

export default class login extends BaseReact {
  constructor(props : any){
    super(props);
  }
  componentDidMount(){
    let self = this;
    let resData = global.masterData.setOnListener('login.data',function(props : any){
      console.log('props',props);
      self.setState({});
    },true);
    if(process.browser == true){
      console.log('aaaaaaaaaaaaaa',window);
    }
  }
  handleClick(action:string, props ?: any, e ?: any){
    let self = this;
    switch(action){
      case 'T':
        alert('vdmfkvmdfkv');
        break;
      case 'SUBMIT':
        e.preventDefault();
        // global.masterData.saveData('login.data',{});
        break;
    }
  }
  submit(){
    let self = this;
  }
  render(){
    let form_data : any = global.masterData.getData('login.data',{
      user_name : '',
      password : ''
    })
    console.log('vmdfkvm',form_data.user_name);
    return <Layout>
      <LoginComponent handleClick={this.handleClick} form_data={form_data}></LoginComponent>
    </Layout>;
  }
}