import { DataObjectModel } from "./data-object.model";

export interface TableConfigModel{
	headers: Array<string>;
	data: Array<DataObjectModel>
}