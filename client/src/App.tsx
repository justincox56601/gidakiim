import React, { ReactNode, useState } from 'react';
import './app.scss';
import {  DatabaseService } from './service';
import {
	Menu,
	DataDisplay,
	Header
} from './components';
import{
	Table,
	CollapsibleContainer,
} from './core-components';
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
		<div>
			<Header></Header>
			<div className="App">
				<CollapsibleContainer
					config={{
						title: 'Data Select'
					}}
				>
					<Menu
						databaseService={db}
						submit={handleMenuSubmit}
					></Menu>
				</CollapsibleContainer>
				<DataDisplay
					weatherData={weatherData}
					dataRequest={dataRequest}
				/>
			</div>
		</div>
		
	);
}

export default App;
