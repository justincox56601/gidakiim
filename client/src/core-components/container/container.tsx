import React, { ReactNode } from 'react';
import { ContainerConfigModel } from '../../model';
import { Icon } from '../icon';

interface Props{
	config: ContainerConfigModel,
	children: ReactNode
}
export const Container = ({config, children}:Props) =>{
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
				</div>
			</div>
			<div >
				 {children}
			</div>
			
		</div>
	)
}