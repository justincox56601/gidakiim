import { DataObjectModel, TableConfigModel } from '../../model';
import './table.scss';


interface Props{
	config: TableConfigModel
}
export const Table = ({config}:Props) =>{
	if(config.data.length === 0){return(<></>)} 
	

	return(
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						{config.headers.map((el, index) => <th key={index}>{el}</th>)}
					</tr>
				</thead>
				<tbody>
					{
						config.data.map((row, index) =>{
							return <tr key={index}>
								{
									Object.values(row).map((value, index)=>{
										return <td key={index}>{value}</td>
									})
								}
							</tr>
						})
					}	
				</tbody>
				
			</table>
			
		</div>
	)
}


