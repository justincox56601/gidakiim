import React, { ReactNode, useState } from 'react';
import './app.scss';
import { DatabaseService } from './service';
import {
	Table,
	CollapsibleContainer,
	Container,
	Menu
} from './components/';
const db = DatabaseService.getDatabaseService();



const App = () =>{
	const [weatherData, setWeatherData] = useState({} as DatabaseResponseObjectModel)

	const handleMenuSubmit = (args:any):void =>{
		console.log(args)
	}

	return (
		<div className="App">
			<Container title='Menu'>
				<Menu
					databaseService={db}
					submit={handleMenuSubmit}
				></Menu>
			</Container>
			<CollapsibleContainer title={'Data Graph'}></CollapsibleContainer>
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
