import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconConfigModel } from '../../model';

interface Props{
	config:IconConfigModel
}
export const Icon = ({config}:Props) =>{

	const clickHandler = ():void =>{
		if(config.onClick != null){
			config.onClick();
		}
	}
	
	return(
		<FontAwesomeIcon 
			icon={config.icon} 
			onClick={()=>clickHandler()} 
			className={config.className?.join(' ')} 
			title={config.tooltip}
			style={config.style}
		/>
	)
}

