import React, { ReactNode } from 'react';
import { ContainerConfigModel } from '../../model';
import { Icon } from '../icon';
import styles  from './container.module.scss';
import { Button } from '../button';
import { ButtonToggle } from '../button-toggle';

interface Props{
	config: ContainerConfigModel,
	children?: ReactNode
}
export const Container = ({config, children}:Props) =>{
	return(
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>{config.title}</h2>
				<div className={styles['right-container']}>
					{
						(config.rightContainerConfig?.buttons?.map((button, index)=>{
								return <Button key={index} config={button}/>
						}))
					}
					{
						config.rightContainerConfig?.buttonToggle ? <ButtonToggle config={config.rightContainerConfig.buttonToggle}/> : <></>
					}
				</div>
			</div>
			<div >
				 {children}
			</div>
			
		</div>
	)
}