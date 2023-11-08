import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconConfigModel } from "./icon-config.model";

export interface ContainerConfigModel{
	title?: string;
	rightContainerConfig?: {
		icons?:Array<IconConfigModel>
	}
}

