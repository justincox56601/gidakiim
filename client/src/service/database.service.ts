import  axios  from 'axios';
import { DataRequestModel, DatabaseResponseObjectModel } from '../model';


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

	public async getWeatherData<TModel>(config: DataRequestModel): Promise<DatabaseResponseObjectModel>{
		const req = {
			dataPoints: config.dataPoints.toString(),
			cities: config.cities.toString(),
			startDate: config.startDate, 
			endDate: config.endDate, 
		}

		const params = new URLSearchParams();
		Object.keys(req).forEach(key =>{
			//@ts-ignore
			params.append(key, req[key])
		})
		
		try{
			const response = await this._axios.get(`/data?${params.toString()}`);

			return response.data
		}catch(err){
			console.log(err)
		}

		return {} as DatabaseResponseObjectModel
		
	}
}

