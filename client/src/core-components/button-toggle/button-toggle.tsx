import { Button } from '..';
import { ButtonToggleConfigModel } from '../../model';
import styles from './button-toggle.module.scss';

interface Props{
	config: ButtonToggleConfigModel,
}

export const ButtonToggle = ({config}:Props) =>{
	
	return(
		<div className={styles.toggle}>
			{
				config.buttons.map((button, index)=>{
					return(
						<div key={index} className={config.state.toLowerCase() === button.name.toLowerCase() ? styles.active : ''}>
							<Button  config={button} />
						</div>
						
					)
				})
			}
		</div>
			
	)
}

