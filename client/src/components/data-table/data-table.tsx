import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { 
	CollapsibleContainer,
	Table 
} from '../../components';
import { DatabaseResponseObjectModel, CollapsibleContainerConfigModel } from '../../model';
import './data-table.scss';


interface Props{
	weatherData: DatabaseResponseObjectModel 
}
export const DataTable = ({weatherData}:Props) =>{

	const containerConfig: CollapsibleContainerConfigModel = {
		title: 'Data Table',
		overflowY: 'scroll',
		rightContainerConfig:{
			icons: weatherData.data!= null ? [
				{
					icon: faFileArrowDown,
					onClick: ()=>{console.log('clicked')},
					tooltip: 'Download currrent data',
					//className?: Array<string>
				}
			]: []
		}
	}

	return(
		<div>
			<CollapsibleContainer 
				config={containerConfig}
			>
				<Table
					weatherData={weatherData}
				></Table>
			</CollapsibleContainer>
		</div>
	)
}