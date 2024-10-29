import { useState } from 'react';
import './App.css';
import Charts from './components/Charts/Charts';
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather';
import Week from './components/Week/Week';
import Footer from './components/Footer/Footer';

function App() {
  const [city,setCity] = useState();
  return (
    <div className="App">
      <Header setCity={setCity}/>
      <Weather city={city}/>
      <Week city={city}/>
      <Charts city={city}/>
      <Footer/>
    </div>
  );
}

export default App;
