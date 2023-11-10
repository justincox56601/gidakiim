
import React, { useState, useEffect } from 'react';
import { DatabaseService } from "../../service";
import { ButtonConfigModel, DataRequestModel, GraphConfigModel } from '../../model';
import { CheckboxFormControlModel, FormControl, FormControlType } from "../../core-components/form-control";
import styles from './menu.module.scss';
import { Button } from '../../core-components';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
			startDate: getSimpleFormValue(form['startDate']).replaceAll('/', '-'),
			endDate: getSimpleFormValue(form['endDate']).replaceAll('/', '-'),
		}
		
		submit(resp)
	}

	
	const submitConfig: ButtonConfigModel = {
		type: 'submit',
		name: 'submit',
		content:{
			text: 'Submit',
		}
		
	}
	
	return(
		<div className={styles['data-menu']}>
			<form onSubmit={(e)=>{handleSubmit(e)}}>
				{
					controls.map((control, index) => {
						return <FormControl control={control} key={index}></FormControl>
					})
				}
				<Button config={submitConfig}/>
			</form>
			
		</div>
		

		
	)
}