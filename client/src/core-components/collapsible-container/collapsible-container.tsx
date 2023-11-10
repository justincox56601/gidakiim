import React, { ReactNode, useState } from 'react';
import styles from './collapsible-container.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CollapsibleContainerConfigModel } from '../../model';
import { Icon, Button } from '..';


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
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>{config.title}</h2>
				<div>
					{
						(config.rightContainerConfig?.buttons?.map((button, index)=>{
							return <Button key={index} config={button}/>
					}))
					}
					<Icon
						config={{
							icon: faAngleDown,
							onClick: collapse,
							className:collapsed===true? [styles['arrow-down']]: [styles['arrow-up']]
						}}
					></Icon>
				</div>
			</div>
			<div className={`${styles.collapsible} ${(collapsed === true ? styles.closed :styles.open)}`} style={{overflowY: config.overflowY ?? 'hidden'}}> 
				 {children}
			</div>
			
		</div>
	)
}


