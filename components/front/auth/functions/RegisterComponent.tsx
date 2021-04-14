import BaseFunction from "base/ts/BaseFunction";
import { LoginComponentInterface } from "./LoginComponent";
import Link from 'next/link'

export interface RegisterComponentInterface extends LoginComponentInterface{
  setOnListener : {(listener : any) : void | null }
}

export default function RegisterComponent(props : {
  setFunction : {(theFunction : RegisterComponentInterface) : void},
  form_data ?: any 
}){
  let RegisterComponent : RegisterComponentInterface = {
    ref : null,
    handleClick : function(action,props,e){
      this.onListener(action,props,e);
    },
    setOnListener : function(listen){
      this.onListener = listen;
    },
    handleChange : function(action,props,e){
      global.masterData.updateData('register.form_data',{
        [e.target.name] : e.target.value
      });
    },
    render(){
      let form_data : any = global.masterData.getData('register.form_data',{
        email : '',
        password : '',
        password_confirm : '',
        first_name : '',
        last_name : '',
      });
      return (
        <div className="text-body" ref={(ref)=>this.ref=ref}>
          <form className="form-signin">
            <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width={72} height={72} />
            <h1 className="h3 mb-3 font-weight-normal">Register Form</h1>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" value={form_data.email} name="email" onChange={this.handleChange.bind(this,'register',{})} className="form-control" placeholder="Email address" required />
                <div className="invalid-feedback"></div>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" name="password" value={form_data.password} onChange={this.handleChange.bind(this,'register',{})} className="form-control" placeholder="Password" required />
                <div className="invalid-feedback"></div>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPasswordConfirm" className="sr-only">Password Confirmation</label>
                <input type="password" name="password_confirm" className="form-control" value={form_data.password_confirm} onChange={this.handleChange.bind(this,'register',{})} placeholder="Password Confirmation" required />
                <div className="invalid-feedback"></div>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword" className="sr-only" >First Name</label>
                <input type="text" name="first_name" className="form-control" value={form_data.first_name} onChange={this.handleChange.bind(this,'register',{})} placeholder="First Name" required />
                <div className="invalid-feedback"></div>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword" className="sr-only" >Last Name</label>
                <input type="text" name="last_name" className="form-control" value={form_data.last_name} onChange={this.handleChange.bind(this,'register',{})} placeholder="Last Name" required />
                <div className="invalid-feedback"></div>
              </div>
              <div className="col-md-12">
                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" defaultValue="remember-me" /> Remember me
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick.bind(this,'SUBMIT',{})}>Register</button><br></br>
            <Link href="/auth/login">
              <a>Back To Login</a>
            </Link>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
        </div>
      );
    }
  }
  props.setFunction(RegisterComponent);
  return BaseFunction(RegisterComponent);
}