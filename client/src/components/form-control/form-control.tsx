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

	const getCheckboxControl = (control: CheckboxFormControlModel) =>{
		return(
			<div>
				<input type="checkbox" name={control.name} id={control.name} value={control.value}  defaultChecked={control.checked??false} />
				<label htmlFor={control.name}>{control.label}</label>
			</div>
			
		)
	}

	const getCheckboxGroupControl = (control: CheckboxGroupFormControlModel) =>{
		const options: Array<CheckboxFormControlModel> = control.options.map((option) =>{
			return {
				label: option.text,
				value: option.value,
				name: control.name,
				type: 'checkbox'
			}
		})
		return(
			<div>
				{control.label}
				{
					options.map((option, index) => {
						return(
							<div key={index}>
								{getCheckboxControl(option)}
							</div>
						)
					})
				}
			</div>
		)
	}

	switch (control.type) {
		case 'select':
			return getSelectControl(control as SelectFormControlModel);
			
		case 'date':
			return getDateControl(control as DateFormControlModel)
		
		case 'checkbox':
			return getCheckboxControl(control as CheckboxFormControlModel);
		case 'checkboxGroup':
			return getCheckboxGroupControl(control as CheckboxGroupFormControlModel);
		default:
			return <></>
	}
}

export type FormControlType = FormControlBaseModel | SelectFormControlModel | DateFormControlModel | CheckboxFormControlModel | CheckboxGroupFormControlModel;

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

export interface CheckboxFormControlModel extends Omit<FormControlBaseModel, 'value'>{
	value: string | number;
	checked?: boolean;
}

export interface CheckBoxGroupOptionsModel{
	text: string;
	value: string | number;
}

export interface CheckboxGroupFormControlModel extends FormControlBaseModel{
	options: Array<CheckBoxGroupOptionsModel>
}