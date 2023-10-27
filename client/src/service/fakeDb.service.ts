import  axios  from 'axios';

class FakeDbService{
	protected static _singleton: FakeDbService;
	private readonly _BASEURL = 'http://localhost:3001'; //make this and env variable
	private _axios;

	private constructor(){
		this._axios = axios.create({
			baseURL:this._BASEURL
		})
	}

	public static getFakeDbService(): FakeDbService{
		if(FakeDbService._singleton == null){
			FakeDbService._singleton = new FakeDbService()
		}

		return FakeDbService._singleton
	}

	public async getCities():Promise<Array<string>>{
		console.log('i was called')
		const cities = await this._axios.get('/cities')
		console.log(cities)
		return cities.data
	}
}

export default FakeDbService