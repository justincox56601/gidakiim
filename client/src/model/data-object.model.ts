export interface DataObjectModel {
	_id: number;
	_created_at: string;
	city: string;
	observed_time: string;
	observed_time_unix: number;
	temperature?: number;
	pressure?: number;
	wind_speed?: number;
	wind_direction?: number;
	abbreviated_wind_direction?: string;
	relative_humidity?: number;
	cloud_coverage?: number;
	precipitation?: number;
	snow?: number;
	direct_normal_solar_irradiance?: number;
	solar_radiation?: number;
}