import React, {useContext} from 'react';
import Header from "./components/Header"
import Photos from "./components/Photos"
import ResultsModal from "./components/ResultModal"
import { AppContext } from './components/Context';

function App() {

  const {isModalOpen} = useContext(AppContext)

  return (
    <div className="App">
      {isModalOpen && <ResultsModal />}
      <Header />
      <Photos />
    </div>
  );
}

export default App;
