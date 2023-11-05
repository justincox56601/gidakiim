
//need to pass in the database service
// need to use db service to get cities list and data points list
//need to pass in a callback for once the user submits
//need to add font awesome icons to users can add rows
//need to add font awesome icons so users can remove rows
//need to add font awesome icon so users can pick colors
//local state will be an array of {city, dataPoint, startDate, endDate, color}
//will need to transform that into what the callback / database service needs.
//might want to pass in a menu service to handle some of this
//need to make a config that I will pass in and this component will need to be smart enough parse it
import React, { useState, useEffect } from 'react';
import { DatabaseService } from "../../service"
import { FormControl, FormControlType } from "../form-control"

interface Props{
	databaseService: DatabaseService,
	submit: (args:any)=>void
}
export const Menu = ({databaseService, submit}:Props) =>{
	const [cities, setCities] = useState([] as Array<string>);
	const [dataPoints, setDataPoints] = useState([] as Array<string>);

	useEffect(()=>{
		const getCities = async()=>{
			const cities = await databaseService.getCities()
			//@ts-ignore - I need to update the database service to return an DataResponseModel then I can get rid of this
			setCities(cities.data)
		}
	
		const getDatatPoints = async() =>{
			const dataPoints = await databaseService.getCities() //update this when I get the database service with a method for this
			//@ts-ignore - I need to update the database service to return an DataResponseModel then I can get rid of this
			setDataPoints(dataPoints.data)
		}
	
		getCities()
		getDatatPoints()
	}, [databaseService]);
	
	
	const controls: Array<FormControlType> = [
		{
			type: 'select',
			name: 'citySelectControl',
			label: 'City Select',
			options:[
				...cities.map(city =>{
					return {
						text: city,
						value:city
					}
				})
			]
		},
		{
			type: 'select',
			name: 'dataPointSelectControl',
			label: 'Data Point Select',
			options:[
				...dataPoints.map(dataPoint =>{
					return {
						text: dataPoint,
						value:dataPoint
					}
				})
			]
		},
		{
			type: 'date',
			name: 'startDate',
			label: 'Start Date'
		},
		{
			type: 'date',
			name: 'endDate',
			label: 'End Date'
		}
	]

	const handleSubmit = (form: HTMLFormElement):void =>{
		const resp: {[key:string]:string} = {}
		for(const control of controls){
			resp[control.name] = form[control.name].value
		}
		submit(resp)
	}
	return(
		//@ts-ignore
		<form onSubmit={(e)=>{e.preventDefault(); handleSubmit(e.target)}}>
			{/* <select name="city" id="city" >
				<option value="Bemidji">Bemidji</option>
				<option value="Cass Lake">Cass Lake</option>
			</select>
			<select name="DataPoint" id="DataPoint" >
				<option value="Temperature">Temperature</option>
				<option value="Pressure">Pressure</option>
			</select>
			<input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
			<input type="date" id="end" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" /> */}
			{
				controls.map((control, index) => {
					return <FormControl control={control} key={index}></FormControl>
				})
			}
			<input type="submit" value="Submit" />
		</form>
	)
}