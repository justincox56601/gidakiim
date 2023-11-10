import { IconConfigModel } from "./icon-config.model";

export interface ButtonConfigModel{
	type: 'button' | 'submit' | 'reset' ;
	name: string;
	content:{
		text?: string;
		icons?: Array<IconConfigModel>;
	}
	onClick?: ()=>void;
}