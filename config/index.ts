import coding from './coding';
import devserver from './devserver';
import production from './production';

let configUse : any = coding;

switch(process.env.APP_MODE){
  case 'coding':
    configUse = coding;
    break;
  case 'devserver':
    configUse = devserver;
    break;
  case 'production':
    configUse = production;
    break;
}
// console.log('vf',process.env.APP_MODE);

export default configUse;