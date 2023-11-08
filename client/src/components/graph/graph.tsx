import React from 'react';
import { DatabaseResponseObjectModel } from '../table-component';
import './graph.scss';
import { DatasetConfigModel, DataRequestModel } from '../../model';
import {Chart as ChartJS, registerables} from 'chart.js/auto';
import {Scatter, Chart} from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
ChartJS.register(...registerables);


interface Props{
	weatherData: DatabaseResponseObjectModel,
	dataRequest: DataRequestModel
}

export const Graph = ({weatherData, dataRequest}:Props) =>{
	if(Object.keys(weatherData).length === 0){return(<></>)}  
	
	const titleCase = (word:string): string =>{
		return word.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
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


	const data = {
		datasets: Array.from(dataMaps.values())
	}
	
	
	return(
		<div className="canvas-container">
			<Scatter
				data={data}
				options={
					{
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
			/>
		</div>
		
	)
}

