import { ButtonConfigModel } from '../../model'
import { Icon } from '../icon'
import styles from './button.module.scss'

interface Props{
	config: ButtonConfigModel
}
export const Button =({config}:Props) =>{

	return(
		<button 
			className={styles.button} 
			type={config.type} 
			onClick={config.onClick}
		>
			{config.content.text}
			{config.content.icons?.map((icon, index)=>{
				return <Icon key={index} config={icon}/>
			})}
		</button>
	)
}

