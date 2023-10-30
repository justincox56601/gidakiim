import  axios  from 'axios';


export class DatabaseService {
	protected static _singleton: DatabaseService;
	private _axios;

	private constructor(){
		this._axios = axios.create({
			baseURL: 'http://localhost:3001'
		})
	}

	public static getDatabaseService(): DatabaseService{
		if(DatabaseService._singleton == null){
			DatabaseService._singleton = new DatabaseService()
		}

		return DatabaseService._singleton
	}

	public async getCities():Promise<Array<string>>{
		console.log('i was called', process.env.BASE_URL)
		const cities = await this._axios.get('/cities')
		console.log(cities)
		return cities.data
	}
}