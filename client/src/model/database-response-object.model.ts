import { DataObjectModel } from "./data-object.model";

export interface DatabaseResponseObjectModel {
	meta:{
		totalNumberOfRecords: number,
		fields: Array<{name:string, description:string}>,
		dataCollectionStatement: string
	},
	data:Array<DataObjectModel>
}