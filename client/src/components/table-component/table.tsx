import './table.scss';

interface Props{
	weatherData: DatabaseResponseObjectModel
}
export const Table = ({weatherData}:Props) =>{
	if(Object.keys(weatherData).length === 0){return(<></>)}

	const titleCase = (word:string): string =>{
		return word.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
	}
	
	const headers = weatherData.meta.fields.map(el => el.name)

	return(
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						{headers.map((el, index) => <th key={index}>{titleCase(el)}</th>)}
					</tr>
				</thead>
				<tbody>
					{
						weatherData.data.map((row, index) =>{
							return <tr key={index}>
								{
									headers.map((header, index) => {
										return <td key={index}>{row[header as keyof DataObjectModel]}</td>
									})
								}
							</tr>
						})
					}	
				</tbody>
				
			</table>
			<div className="meta-container">
				{
					weatherData.meta.fields.map((field, index) =>{
						return <p key={index}>*{titleCase(field.name)}: {field.description}</p>
					})
				}
				<p>*{weatherData.meta.dataCollectionStatement}</p>
			</div>
		</div>
	)
}


interface DatabaseResponseObjectModel<TDataPoint = {}> {
	meta:{
		totalNumberOfRecords: number,
		fields: Array<{name:string, description:string}>,
		dataCollectionStatement: string
	},
	data:Array<DataObjectModel<TDataPoint>>
}

interface DataObjectModel<TDataPoint ={}> {
	_id: number,
	_created_at: string,
	city: string,
	TDataPoint: number
}