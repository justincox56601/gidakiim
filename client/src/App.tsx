import React from 'react';
import './App.css';
import { DatabaseService } from './service';

const App = () =>{
	const db = DatabaseService.getDatabaseService();
	const [data, setData] = React.useState({})

	const dataCallback = async():Promise<void> =>{
		try {
			const data = await db.getWeatherData<any>()
			setData(data.data)
		} catch (error) {
			console.error(error)
		}
		
	}
	

  return (
    <div className="App">
      <h1>
		<button onClick={dataCallback}>CLick Here</button>
		{JSON.stringify(data)}
		</h1>
    </div>
  );
}

export default App;
