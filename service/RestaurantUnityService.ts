export default class RestaurantUnityService {
  fetcher : any = null;
  baseUrl : String = ''

  constructor(fetcher: any, baseUrl: String) {
    this.fetcher = fetcher;
    this.baseUrl = baseUrl;
  }

  async getTablesAndOpenedOrderPad(restaurantUnityId: Number) {
    return await this.fetcher(`${this.baseUrl}/v1/api/restaurant-unity/${restaurantUnityId}/tables`)
  }
}