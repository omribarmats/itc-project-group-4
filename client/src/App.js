import './App.css';
import Map from './components/Map/Map';
import TestMap from './components/Map/TestMap';
import 'leaflet/dist/leaflet.css';
import UiStack100Vh from './ui/uiKit/layouts/UiStack100Vh';
import NavBar from './components/NavBar/NavBar';
import Modal from './components/Modal/Modal';


function App() {
  return (
    <UiStack100Vh >
     <NavBar></NavBar>
      {/* <Map/> */}
      <Map/>
      <Modal/>
    </UiStack100Vh>

  );
}

export default App;
