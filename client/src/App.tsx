import  axios  from 'axios';
import React from 'react';
import './App.css';
import FakeDbService from './service/fakeDb.service';

const App = () =>{
	const db = FakeDbService.getFakeDbService();
	const [data, setData] = React.useState({})

	const dataCallback = async():Promise<void> =>{
		try {
			const data = await db.getCities()
			console.log(data)
			setData(data)
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
