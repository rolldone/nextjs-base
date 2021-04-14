import SmartValidation from "base/ts/SmartValidation";
import RegisterComponent, { RegisterComponentInterface } from "components/front/auth/functions/RegisterComponent";
import Layout from "./Layout";
import login from "./login";

const FORM_ATTRIBUTE_NAME = {
  email : 'Email Address',
  password : 'Password',
  password_confirm : 'Password Confirm',
  first_name : 'First Name'
}
const FORM_RULES = {
  email : 'required|email',
  password : 'required|min:8',
  password_confirm : 'required|same:password',
  first_name : 'required'
}

export default class register extends login{
  registerComponentFunction : RegisterComponentInterface = null
  constructor(props : any){
    super(props);
  }
  componentDidMount(){
    let self = this;
    console.log('register',global.masterData.getData('login.data',{}));
    this.setInitDOMSelection('registerComponentFunction');
    this.setInitDOMSelection('inputTextValidation');
    let data : any = global.masterData.setOnListener('register.*',function(props : any){
      self.setState({});
    },true) || {};
  }
  handleClick(action : String,props : any ,e : any){
    alert(action);
  }
  submitRegister(){
    let self = this;
    try{
      let service = null;
    }catch(ex){
      console.error('submitRegister - ex',ex);
    }
  }
  setInitDOMSelection(action : String, props ?: any){
    let self : any = this;
    switch(action){
      case 'inputTextValidation':
        var registerComponentFunction = this.registerComponentFunction;
        let registerFormData = global.masterData.getData('register.form_data',{});
        let smartValidation = SmartValidation(registerComponentFunction.ref);
        smartValidation.inputTextValidation({
          form_attribute_name : FORM_ATTRIBUTE_NAME,
          form_data : registerFormData,
          form_rules : FORM_RULES,
          element_target : 'input[type=text],input[type=email],input[type=password]',
          callback : function(res : any,e : any){
            if(res.status == "error"){
              for(var key in res.error){
                $.when($(e.target).parent().find('.invalid-feedback')).then(function(q){
                  q.text(res.error[key]).show();
                });
              }
            }else{
              for(var key in res.form_data){
                $.when($(e.target).parent().find('.invalid-feedback')).then(function(q){
                  q.text('').hide();
                });
              }  
            }
            if(res.status == "complete"){
              /* Activate the submit button */
            }
          }
        });
        break;
      case 'registerComponentFunction':
        var registerComponentFunction = this.registerComponentFunction;
        registerComponentFunction.setOnListener(function(action : String, props ?: any){
          switch(action){
            case 'SUBMIT':
              self.handleClick(action,props);
              break;
          }
        });
        break;
    }
  }
  render(){
    return (<Layout>
      <RegisterComponent setFunction={(theFunction)=>this.registerComponentFunction=theFunction}></RegisterComponent>
    </Layout>)
  }
}