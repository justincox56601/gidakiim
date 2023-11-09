import { faChartLine, faFileArrowDown, faTableList } from '@fortawesome/free-solid-svg-icons';
import { Container, Graph, Table } from '../../core-components';
import { ContainerConfigModel, DataObjectModel, DataRequestModel, DatabaseResponseObjectModel, DatasetConfigModel, GraphConfigModel, TableConfigModel } from '../../model';
import './data-display.scss';
import { useState } from 'react';

interface Props{
	weatherData: DatabaseResponseObjectModel,
	dataRequest: DataRequestModel
}
export const DataDisplay = ({weatherData, dataRequest}:Props) =>{
	const [display, setDisplay] = useState('table');

	if(Object.keys(weatherData).length === 0){return(<div><p>No Data</p></div>)} //this needs to be updated to show a stylized No Data message 
	
	const titleCase = (word:string): string =>{
		return word.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
	}

	const changeDisplay = (state: 'table' | 'graph'): void =>{
		setDisplay(state)
	}

	const headers: Array<string> = weatherData.meta.fields.map(el => el.name);
	const data: Array<DataObjectModel> = [];
	for(const row of weatherData.data){
		for(const key of Object.keys(row)){
			if(!headers.includes(key)){
				delete row[key as keyof DataObjectModel]
			}
		}

		data.push(row)
	}
	
	const tableConfig: TableConfigModel = {
		headers: headers.map(el => titleCase(el)),
		data: data
	}

	const containerConfig: ContainerConfigModel = {
		title: 'Data Display',
		rightContainerConfig:{
			icons:[
				...data.length > 0 ? [{
					icon: faFileArrowDown,
					onClick: ()=>{console.log('clicked')},
					tooltip: 'Download currrent data',
				}]:[],
				{
					icon: faTableList,
					onClick: () =>{changeDisplay('table')},
					tooltip: 'Table view',
				},
				{
					icon: faChartLine,
					onClick: () =>{changeDisplay('graph')},
					tooltip: 'Graph view',
				}
			]
		}
	}

	const dataMaps: Map<string,DatasetConfigModel> = new Map();
	for(const data of weatherData.data){
		for(const dp of dataRequest.dataPoints){
			const key: string =`${titleCase(data.city)} - ${titleCase(dp)}`
		
			if(!dataMaps.has(key)){
				dataMaps.set(key, {label: key, data:[]})
			}

			const dataMap = dataMaps.get(key)
			//@ts-ignore
			dataMap?.data.push({x: data['observed_time_unix']*1000, y:data[dp]})
		}
	}

	const graphConfig: GraphConfigModel<'scatter'> = {
		data: {datasets: Array.from(dataMaps.values())},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			scales: {
				x: {
					type: 'timeseries',        
					time: {
					unit: 'day',
					displayFormats: {
						day: 'MM/dd/yyyy HH:mm'
					},
					tooltipFormat: 'MM/dd/yyyy HH:mm'
					},
					position: 'bottom'
				}
			}
		}
	}

	return(
		<Container
			config={containerConfig}
		>
			{
				display === 'table' ?
					<Table
						config={tableConfig}
					></Table>
					:
					<Graph
						config={graphConfig}
					></Graph>
			}
			<div className="meta-container">
				{
					weatherData.meta.fields.map((field, index) =>{
						return <p key={index}>*{titleCase(field.name)}: {field.description}</p>
					})
				}
				<p>*{weatherData.meta.dataCollectionStatement}</p>
			</div>
			
		</Container>
	)
}