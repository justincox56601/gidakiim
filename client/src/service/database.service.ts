import  axios  from 'axios';


export class DatabaseService {
	protected static _singleton: DatabaseService;
	private _axios;

	private constructor(){
		this._axios = axios.create({
			baseURL: 'http://localhost:3001/v1/weather'
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

	public async getDataPoints():Promise<Array<string>>{
		const cities = await this._axios.get('/datapoints')
		return cities.data
	}

	public async getWeatherData<TModel>(config: DataRequestModel): Promise<TModel>{
		const req = {
			dataPoints: config.dataPoints.toString(),
			cities: config.cities.toString(),
			startDate: '2021-04-16 02:45:00', //config.startDate - change this end data in database is updated
			endDate: '2023-08-16 02:45:00', //config.endDate - change this when data in the database is updated
		}

		const params = new URLSearchParams();
		Object.keys(req).forEach(key =>{
			//@ts-ignore
			params.append(key, req[key])
		})

		const response = await this._axios.get(`/data?${params.toString()}`);

		return response.data
	}
}

export interface DataRequestModel{
	dataPoints: Array<string>;
	cities: Array<string>;
	startDate: string;
	endDate: string;
}