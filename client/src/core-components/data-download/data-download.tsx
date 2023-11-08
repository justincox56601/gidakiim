import { DataObjectModel } from '../../model';
import './data-download.scss';

interface Props{
	data: Array<DataObjectModel>
}
export const DataDownload = ({data}: Props) =>{
	const blobData:Array<string> = []
		blobData.push(Object.keys(data[0]).join(',')); //headers
		for(const d of data){
			blobData.push( Object.values(d).join(',')) //body
		}

		const blob = new Blob([blobData.join('\n')], {type:'text/csv'});
		const href = URL.createObjectURL(blob);

		return(
			<div>
				<a href={href} download={"download.csv"} >Download Current Data</a>
			</div>	
		)
}