import BaseFunction, {BaseFunctionInterface} from "base/ts/BaseFunction";
import Link from 'next/link'

export interface LoginComponentInterface extends BaseFunctionInterface {
  // test(action: String, props : any, e : any) : void,
  form_data ?: any
}

export default function LoginComponent(props : LoginComponentInterface){
  
  return BaseFunction(({
    handleClick: props.handleClick,
    handleChange: function(action,props,e){
      global.masterData.updateData('login.data',{
        [e.target.name] : e.target.value
      });
    },
    render : function(){
      return (
        <div className="text-body">
          <form className="form-signin">
            <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width={72} height={72} />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" value={props.form_data.user_name} name="user_name" onChange={this.handleChange.bind(this,'email',{})} className="form-control" placeholder="Email address" />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" value={props.form_data.password} name="password" onChange={this.handleChange.bind(this,'password',{})} className="form-control" placeholder="Password" />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" defaultValue="remember-me" /> Remember me 
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleClick.bind(this,'SUBMIT',{})}>Sign in</button><br></br>
            <Link href="/auth/register">
              <a>Register</a>
            </Link>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
        </div>
      )
    }
  } as LoginComponentInterface));
}