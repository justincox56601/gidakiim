import { faChartLine, faFileArrowDown, faTableList } from '@fortawesome/free-solid-svg-icons';
import { Container, Graph, Table } from '../../core-components';
import { 
	ButtonConfigModel, 
	ContainerConfigModel, 
	DataObjectModel, 
	DataRequestModel, 
	DatabaseResponseObjectModel, 
	DatasetConfigModel, 
	GraphConfigModel, 
	TableConfigModel 
} from '../../model';
import './data-display.scss';
import { useState } from 'react';
import FileSaver from 'file-saver';

interface Props{
	weatherData: DatabaseResponseObjectModel,
	dataRequest: DataRequestModel
}
export const DataDisplay = ({weatherData, dataRequest}:Props) =>{
	const [display, setDisplay] = useState('table');
	

	if(Object.keys(weatherData).length === 0){
		return(
			<Container config={{title: 'Data Display'}}>
				<div><p>No Data</p></div>
			</Container>
		)
	}

	const headers: Array<string> = weatherData.meta.fields.map(el => el.name);
	const data: Array<DataObjectModel> = [];

	const titleCase = (word:string): string =>{
		return word.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
	}

	const changeDisplay = (state: 'table' | 'graph'): void =>{
		setDisplay(state)
	}

	
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

	const downloadData = ():void =>{
		const blobData:Array<string> = []
		blobData.push(Object.keys(data[0]).join(',')); //headers
		for(const d of data){
			blobData.push( Object.values(d).join(',')) //body
		}

		const blob = new Blob([blobData.join('\n')], {type:'text/csv'});

		FileSaver.saveAs(blob, "download.csv");
	}


	const containerConfig: ContainerConfigModel = {
		title: 'Data Display',
		rightContainerConfig:{
			buttons:[
				...data.length > 0 ? [{
					type: 'button',
					name: 'downloadData',
					onClick: ()=>{downloadData()},
					content:{
						icons:[
							{
								icon: faFileArrowDown,
								tooltip: 'Download currrent data',
							}
						]
					}
				} as ButtonConfigModel]:[],
			],
			buttonToggle:{
				state: display,
				buttons:[
					{
						type: 'button',
						name: 'table',
						onClick: () =>{changeDisplay('table')},
						content:{
							icons:[
								{
									icon: faTableList,
									tooltip: 'Table view',
								}
							]
						}
					},
					{
						type: 'button',
						name: 'graph',
						onClick: () =>{changeDisplay('graph')},
						content:{
							icons:[
								{
									icon: faChartLine,
									tooltip: 'Graph view',
								}
							]
						}
					},
					
				],
			}
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

	const renderedComponent: {[key:string]: any} = {
		noData: <div><p>No Data</p></div>,
		table: <Table config={tableConfig}/>,
		graph: <Graph config={graphConfig}/>,
	}

	return(
		<Container
			config={containerConfig}
		>
			{	
				renderedComponent[display] ?? <></>
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