import React, { useState } from 'react';
import { DatabaseService } from './service';

import Table from './components/table-component/table';
const db = DatabaseService.getDatabaseService();

const App = () =>{
	const [weatherData, setWeatherData] = useState({} as DatabaseResponseObjectModel)
	const getWeatherData = async() =>{
		const data: DatabaseResponseObjectModel = await db.getWeatherData()
		setWeatherData(data)
	}
	return (
		<div className="App">
			<button onClick={getWeatherData}>
				Click Me
			</button>
			<Table
				weatherData={weatherData}
			></Table>
		</div>
	);
}

export default App;

interface DatabaseResponseObjectModel<TDataPoint = {}> {
	meta:{
		totalNumberOfRecords: number,
		fields: Array<{name:string, description:string}>,
		dataCollectionStatement: string
	},
	data:Array<DataObjectModel<TDataPoint>>
}

interface DataObjectModel<TDataPoint ={}> {
	_id: number,
	_created_at: string,
	city: string,
	TDataPoint: number
}
