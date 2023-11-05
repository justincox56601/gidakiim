import React, { ReactNode, useState } from 'react';
import './collapsible-container.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


interface Props{
	title: string,
	children?: ReactNode
}
export const CollapsibleContainer = ({title, children}: Props) =>{
	const [collapsed, setCollapsed] = useState(true)

	const collapse = () =>{
		setCollapsed(!collapsed)
	}
	return(
		<div className='container'>
			<div className='header'>
				<h2>{title}</h2>
				<FontAwesomeIcon icon={faAngleDown} onClick={()=>collapse()} className={collapsed===true? 'arrow-down': 'arrow-up'}/>
			</div>
			<div className={`collapsible ${collapsed === true ? 'closed':'open'}`}>
				 {children}
			</div>
			
		</div>
	)
}
