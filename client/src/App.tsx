import React, { ReactNode, useState } from 'react';
import './app.scss';
import { DataRequestModel, DatabaseService } from './service';
import {
	Table,
	CollapsibleContainer,
	Container,
	Menu,
	Graph
} from './components/';
const db = DatabaseService.getDatabaseService();



const App = () =>{
	const [weatherData, setWeatherData] = useState({} as DatabaseResponseObjectModel);
	const [dataRequest, setDataRequest] = useState({} as DataRequestModel);

	const handleMenuSubmit = async(dataRequest:DataRequestModel):Promise<void> =>{
		setWeatherData(await db.getWeatherData(dataRequest))
		setDataRequest(dataRequest);
	}

	return (
		<div className="App">
			<CollapsibleContainer title='Menu'>
				<Menu
					databaseService={db}
					submit={handleMenuSubmit}
				></Menu>
			</CollapsibleContainer>
			<CollapsibleContainer title={'Data Graph'}>
				<Graph
					weatherData={weatherData}
					dataRequest={dataRequest}
				></Graph>
			</CollapsibleContainer>
			<CollapsibleContainer title={'Data Table'}>
				<Table
					weatherData={weatherData}
				></Table>
			</CollapsibleContainer>
			
			
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
