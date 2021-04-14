import React from "react";

export default class BaseReact extends React.Component{
  isPending : any = null
  constructor(props : any){
    super(props);
  }
  handleClick(action : string, props : any, e : HTMLElement){}
  handleChange(aciton : string, props : any , e : HTMLElement){}
  setInitDOMSelection(action: string, props : any){}
  
}