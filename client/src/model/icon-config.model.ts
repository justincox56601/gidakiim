import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconConfigModel{
	icon: IconProp;
	onClick?: ()=>void;
	tooltip?: string;
	className?: Array<string>;
	style?: any;
}