import React, { ReactNode } from 'react';

interface Props{
	title:string,
	children: ReactNode
}
export const Container = ({title, children}:Props) =>{
	return(
		<div className='container'>
			<div className='header'>
				<h2>{title}</h2>
			</div>
			<div >
				 {children}
			</div>
			
		</div>
	)
}