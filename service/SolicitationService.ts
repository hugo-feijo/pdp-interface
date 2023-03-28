export default class SolicitationService {
  fetcher : any = null;
  baseUrl : String = ''

  constructor(fetcher: any, baseUrl: String) {
    this.fetcher = fetcher;
    this.baseUrl = baseUrl;
  }

  async getSolicitation(clientId: Number) {
    return await this.fetcher(`${this.baseUrl}/v1/api/solicitation/client/${clientId}`)
  }

  async createSolicitation(request: Object) {
    return await this.fetcher(`${this.baseUrl}/v1/api/solicitation`, {method: 'POST', body: request})

  }
}