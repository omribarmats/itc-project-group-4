import './App.css';
import LeafletMap from './components/LeafletMap';
import 'leaflet/dist/leaflet.css';
import UiStack100Vh from './ui/uiKit/layouts/UiStack100Vh';
import NavBar from './components/NavBar/NavBar';
import Modal from './components/Modal/Modal';


function App() {
  return (
    <UiStack100Vh >
     <NavBar></NavBar>
      <LeafletMap/>
      <Modal/>
    </UiStack100Vh>

  );
}

export default App;
