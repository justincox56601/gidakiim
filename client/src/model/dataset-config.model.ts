import { DataConfigModel } from "./data-config.model";

export interface DatasetConfigModel{
	label:string, 
	data:Array<DataConfigModel>, 
	backgroundColor?:string
}