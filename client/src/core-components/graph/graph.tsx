import React from 'react';
import { DatabaseResponseObjectModel, GraphConfigModel } from '../../model';
import './graph.scss';
import { DatasetConfigModel, DataRequestModel } from '../../model';
import {Chart as ChartJS, registerables} from 'chart.js/auto';
import {Scatter, Chart} from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
ChartJS.register(...registerables);


interface Props{
	config: GraphConfigModel<'scatter'> //If I ever want to offer more than a scatter plot, I will need to update this
}

export const Graph = ({config}:Props) =>{
	if(config.data.datasets.length === 0){return(<></>)}  
	
	return(
		<div className="canvas-container">
			<Scatter
				data={config.data}
				options={config.options} 
			/>
		</div>
		
	)
}

