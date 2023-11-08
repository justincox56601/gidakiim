
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
import { DataRequestModel, DatabaseService } from "../../service"
import { CheckboxFormControlModel, FormControl, FormControlType } from "../form-control";
import './menu.scss';

interface Props{
	databaseService: DatabaseService,
	submit: (args:any)=>void
}
export const Menu = ({databaseService, submit}:Props) =>{
	const [cities, setCities] = useState([] as Array<string>);
	const [dataPoints, setDataPoints] = useState([] as Array<string>);

	const titleCase = (word:string): string =>{
		return word.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
	}

	useEffect(()=>{
		const getCities = async()=>{
			const cities = await databaseService.getCities()
			//@ts-ignore - I need to update the database service to return an DataResponseModel then I can get rid of this
			setCities(cities.data)
		}
	
		const getDatatPoints = async() =>{
			const dataPoints = await databaseService.getDataPoints() 
			//@ts-ignore - I need to update the database service to return an DataResponseModel then I can get rid of this
			const resp = dataPoints.data.map(dp => titleCase(dp.field_name))
			setDataPoints(resp)
		}
	
		getCities()
		getDatatPoints()
	}, [databaseService]);
	
	
	const controls: Array<FormControlType> = [
		{
			type: 'checkboxGroup',
			name: 'citySelect',
			label: 'Select Cities',
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
			type: 'checkboxGroup',
			name: 'dataPointSelect',
			label: 'Select Data Point',
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
		},
		
	]

	const getSimpleFormValue = (formControl: { value: any; }) =>{
		return formControl.value.toLowerCase();
	}

	//@ts-ignore
	const getCheckboxGroupValue = (formControl): Array<string> =>{
		const resp: Array<string> = [];
		for(const value of formControl){
			if(value.checked){resp.push(value.value.toLowerCase())}
		}
		return resp
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void =>{
		e.preventDefault()
		const form: HTMLFormElement | null = e.currentTarget;
		const resp: DataRequestModel = {
			cities: getCheckboxGroupValue(form['citySelect']),
			dataPoints: getCheckboxGroupValue(form['dataPointSelect']),
			startDate: getSimpleFormValue(form['startDate']),
			endDate: getSimpleFormValue(form['endDate']),
		}
		
		submit(resp)
	}

	
	return(
		<div className="data-menu">
			<form onSubmit={(e)=>{handleSubmit(e)}}>
				{
					controls.map((control, index) => {
						return <FormControl control={control} key={index}></FormControl>
					})
				}
				<input type="submit" value="Submit" />
			</form>
		</div>
		
	)
}