import React, { ReactNode, useState } from 'react';
import './collapsible-container.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CollapsibleContainerConfigModel } from '../../model';
import { Icon } from '../../core-components';


interface Props{
	config: CollapsibleContainerConfigModel,
	children?: ReactNode
}
export const CollapsibleContainer = ({config, children}: Props) =>{
	const [collapsed, setCollapsed] = useState(false)

	const collapse = ():void =>{
		setCollapsed(!collapsed)
	}

	return(
		<div className='container'>
			<div className='header'>
				<h2>{config.title}</h2>
				<div>
					{
						(config.rightContainerConfig?.icons??[]).map((icon, index)=>{
							return(
								<Icon
									key={index} 
									config={icon}
								></Icon>
							)
						})
					}
					<Icon
						config={{
							icon: faAngleDown,
							onClick: collapse,
							className:collapsed===true? ['arrow-down']: ['arrow-up']
						}}
					></Icon>
				</div>
			</div>
			<div className={`collapsible ${collapsed === true ? 'closed':'open'}`} style={{overflowY: config.overflowY ?? 'hidden'}}> 
				 {children}
			</div>
			
		</div>
	)
}


