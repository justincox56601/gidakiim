import { ButtonConfigModel, ButtonToggleConfigModel } from "../model";

export interface ContainerConfigModel{
	title?: string;
	rightContainerConfig?: {
		buttons?: Array<ButtonConfigModel>
		buttonToggle?: ButtonToggleConfigModel;
	}
}

