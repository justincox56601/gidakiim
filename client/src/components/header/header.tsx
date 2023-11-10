import styles from './header.module.scss'
import header from '../../images/LLTC-ComeFindYourPlace-WebHeader-scaled.jpg';


export const Header = () =>{
	return(
		<div className={styles.header}>
			<a href='https://www.lltc.edu/' title='https://www.lltc.edu/' target='_blank' rel="noreferrer">
				<div className={styles['img-container']}>
					<img className={styles.img} src={header} alt="flower border" />
				</div>
			</a>
			<div className={styles.title}>Gidakiim Weather Collection Project</div>
		</div>
	)
}