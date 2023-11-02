import  axios  from 'axios';


export class DatabaseService {
	protected static _singleton: DatabaseService;
	private _axios;

	private constructor(){
		this._axios = axios.create({
			baseURL: 'http://localhost:3001/V1'
		})
	}

	public static getDatabaseService(): DatabaseService{
		if(DatabaseService._singleton == null){
			DatabaseService._singleton = new DatabaseService()
		}

		return DatabaseService._singleton
	}

	public async getCities():Promise<Array<string>>{
		const cities = await this._axios.get('/cities')
		return cities.data
	}

	public async getWeatherData<TModel>(): Promise<TModel>{
		const req = {
			dataPoints: ['temperature', 'pressure'].toString(),
			cities: ['Bemidji', 'Cass Lake'].toString(),
			startDate: '2021-04-16 02:45:00',
			endDate: '2023-08-16 02:45:00'
		}

		const params = new URLSearchParams();
		Object.keys(req).forEach(key =>{
			//@ts-ignore
			params.append(key, req[key])
		})

		const response = await this._axios.get(`/weather/data?${params.toString()}`);

		return response.data
	}
}