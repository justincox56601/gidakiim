import React, { ReactNode, useState } from 'react';
import './app.scss';
import {  DatabaseService } from './service';
import {
	Table,
	CollapsibleContainer,
	Menu,
	Graph,
	DataGraph,
	DataTable
} from './components/';
import { DatabaseResponseObjectModel, DataRequestModel, } from './model';
const db = DatabaseService.getDatabaseService();



const App = () =>{
	const [weatherData, setWeatherData] = useState({} as DatabaseResponseObjectModel);
	const [dataRequest, setDataRequest] = useState({} as DataRequestModel);

	const handleMenuSubmit = async(dataRequest:DataRequestModel):Promise<void> =>{
		const data: DatabaseResponseObjectModel = await db.getWeatherData(dataRequest)
		
		setWeatherData(data.data != null ? data : {} as DatabaseResponseObjectModel)
		setDataRequest(dataRequest);
	}

	return (
		<div className="App">
			<CollapsibleContainer
				config={{}}
			>
				<Menu
					databaseService={db}
					submit={handleMenuSubmit}
				></Menu>
			</CollapsibleContainer>
			<DataGraph
				weatherData={weatherData}
				dataRequest={dataRequest}
			></DataGraph>
			<DataTable
				weatherData={weatherData}
			></DataTable>
			
			
		</div>
	);
}

export default App;
