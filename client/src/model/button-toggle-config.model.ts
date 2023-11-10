import { ButtonConfigModel } from "./button-config.model";

export interface ButtonToggleConfigModel{
	state: string;
	buttons:Array<ButtonConfigModel>
}