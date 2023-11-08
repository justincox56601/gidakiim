import { DataDownload } from "../../core-components";
import { DataObjectModel, DataRequestModel, DatabaseResponseObjectModel } from "../../model";
import { CollapsibleContainer } from "../collapsible-container"
import { Graph } from "../graph"

interface Props{
	weatherData: DatabaseResponseObjectModel,
	dataRequest: DataRequestModel
}
export const DataGraph = ({weatherData, dataRequest}:Props) =>{
	

	return(
		<div>
			<div>
				<h2>Graph Data</h2>
			</div>
			{weatherData.data != null ? <DataDownload data={weatherData.data}/> : <></>}
			<CollapsibleContainer
				config={{}}
			>
				<Graph
					weatherData={weatherData}
					dataRequest={dataRequest}
				></Graph>
			</CollapsibleContainer>
		</div>
	)
}
