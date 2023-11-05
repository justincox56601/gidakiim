import './form-control.scss';


interface Props{
	control: FormControlType
}
export const FormControl = ({control}:Props) =>{
	
	const getSelectControl = (control: SelectFormControlModel) => {
		return(
			<div>
				<label htmlFor={control.name}>{control.label}</label>
				<select name={control.name} id={control.name}>
				{
					control.options.map((option, index) => {
						return(
							<option value={option.value} key={index}>{option.text}</option>
						)
					})
				}
			</select>
			</div>
			
		)
	} 

	const getDateControl = (control: DateFormControlModel) =>{
		return(
			<div>
				<label htmlFor={control.name}>{control.label}</label>
				<input type="date" 
					name={control.name} 
					id={control.name}  
					min={control.minimum??undefined} 
					max={control.maximum??undefined}
				/>
			</div>
		)
	}

	switch (control.type) {
		case 'select':
			return getSelectControl(control as SelectFormControlModel);
			
		case 'date':
			return getDateControl(control as DateFormControlModel)
		default:
			return <></>
	}
}

export type FormControlType = FormControlBaseModel | SelectFormControlModel | DateFormControlModel;

export interface FormControlBaseModel{
	type: string,
	name: string,
	label: string,
	value?: string | number,
	defaultValue?: string | number,
}

export interface SelectFormControlModel extends FormControlBaseModel{
	options: Array<SelectControlOptionModel>
}

export interface SelectControlOptionModel{
	text: string;
	value: string | number;
}

export interface DateFormControlModel extends FormControlBaseModel{
	minimum?: string;
	maximum?: string;
}