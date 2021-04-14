import { MasterDataInterface } from "base/ts/MasterData";


declare global {
  namespace NodeJS {
      interface Global {
          Config: Number,
          Arg : Arg,
          routeApi : {},
          privilege_store_list : {},
          HTTP_REQUEST : {},
          masterData : MasterDataInterface,
          pubsub : any,
          $ : any
      }
  }
}
export {};