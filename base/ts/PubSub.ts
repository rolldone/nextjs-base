import PubSub from '../js/PubSub';
console.log('pubsub',global.pubsub);
if(global.pubsub == null){
  global.pubsub = PubSub;
}
export {}