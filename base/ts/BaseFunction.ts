
export interface BaseFunctionInterface {
  ref ?: null | void,
  render?: {() : JSX.Element | null},
  handleClick?: {(action : String, props : any, e : any) : void | null},
  handleChange?: {(action : String, props : any, e  : any) : void | null},
  setIniDOMSelection?: {(action : String, props : any) : void | null}
}

export default function BaseFunction(props : BaseFunctionInterface){
  return props.render();
}