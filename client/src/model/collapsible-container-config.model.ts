import { ContainerConfigModel } from "./container-config.model";

export interface CollapsibleContainerConfigModel extends ContainerConfigModel{
	overflowY?: 'hidden' | 'scroll' | 'auto' | 'visible' 
}