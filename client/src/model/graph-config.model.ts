import type { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface GraphConfigModel<TType extends keyof ChartTypeRegistry>{
	data: ChartData<TType>; 
	options?: ChartOptions<TType>; 
}