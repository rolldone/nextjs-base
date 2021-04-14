import config from "@config";
import BaseBaseService from '../../../../base/ts/BaseService';

export default class BaseService extends BaseBaseService{
  async getApiRoute() {
    try {
      let url = config.API_LIST;
      let resData : any = await this.getData(url, {
        version: "",
      });
      if (resData.status == "error") throw resData.data.responseJSON;
      return resData;
    } catch (ex) {
      console.error("getApiRoute - ex ", ex);
    }
  }
  setApiRoute(route : any) {
    route = super.setApiRoute(route);
    global.HTTP_REQUEST = Object.freeze({
      AUTH: {
        REGISTER: route["api.member.auth.register"],
        LOGIN: route["api.member.auth.login"],
        LOGOUT: route["api.member.auth.logout"],
        OAUTH_TOKEN : route['passport.token'],
        OAUTH_VAL_REQUEST : route['api.member.auth.oauth_val_request'],
        OAUTH_AUTHORIZE : route['passport.authorizations.authorize']
      },
      ROUTE: {
        LIST: route["api.partner.routes.list"],
      },
      USER: {
        GET_USERS : route['api.partner.user.users'],
        GET_USER : route['api.partner.user.user'],
        CURRENT_USER: route["api.partner.user.current_user"],
        UPDATE_CURRENT_USER: route["api.partner.user.update_current_user"],
      },
      ACTIVITY: {
        LOGS: route["api.partner.activity.logs"],
        USERS: route["api.partner.activity.users"],
        STATS: route["api.partner.activity.stats"],
        EXPORT_LOG: route["api.partner.activity.export_logs"],
        ASK_USER_BY_EMAIL: route["api.partner.activity.ask_user_by_email"]
      },
      BUSINESS : {
        BUSINESSES : route['api.artywiz.artyplanet.store.stores'],
        BUSINESS : route['api.artywiz.artyplanet.store.store'],
        BUSINESS_CATEGORIES : route['api.artywiz.artyplanet.business.category.categories'],
        BUSINESS_CATEGORY : route['api.artywiz.artyplanet.business.category.category']
      },
      PRODUCT : {
        PRODUCTS : route['api.artywiz.artyplanet.product.products'],
        PRODUCTS_SEARCH : route['api.artywiz.artyplanet.product.products_search'],
        PRODUCT_WRAPPED_BUSINESSES : route['api.artywiz.artyplanet.product.product_wrapped_businesses'],
        PRODUCT_WRAPPED_BUSINESS : route['api.artywiz.artyplanet.product.product_wrapped_business'],
        DETAIL_PRODUCTS : route['api.artywiz.artyplanet.product.detail_products'],
        PRODUCT_CATEGORIES : route['api.artywiz.artyplanet.product.category.categories']
      },
      GOOGLE_PLACE : {
        AUTO_COMPLETE : route['api.artywiz.artyplanet.location.auto_complete'],
        DETAILS : route['api.artywiz.artyplanet.location.details']
      },
      GOOGLE_GEOCODE : {
        REVERSE_GEOCODE : route['api.artywiz.artyplanet.location.reverse_geocode']
      },
      IP_LOCATION : {
        CURRENT_LOCATION : route['v1.member.ip.current_location'],
        IP_ADDRESS : route['v1.member.ip.ip_address']
      }
    });
    console.log("HTTP_REQUEST", global.HTTP_REQUEST);
  }
};
