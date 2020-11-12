import React, { useState } from 'react';
import { Arpeggiator } from './components/Arpeggiator';
import { PlaySingle } from './components/PlaySingle';
// will use Material-UI later to make this look nicer
function App() {
  // at the moment these aren't tabs, but I'm planning to use
  // material-ui tabs here later.
  const [currentTab, setCurrentTab] = useState<'Sequence Looper' | 'Single Note'>('Sequence Looper');
  const handleTabChange = () => {
    if(currentTab === 'Sequence Looper') {
      setCurrentTab('Single Note');
    } else {
      setCurrentTab('Sequence Looper');
    }
  }
  return (
    <div className='app'>
      <h1>{`${currentTab} Demo`}</h1>
      {currentTab === 'Sequence Looper' ? <Arpeggiator/> : <PlaySingle/>}
      <button onClick={handleTabChange}>{`Switch to ${currentTab !== 'Sequence Looper' ? 'Sequence Looper' : 'Single Note'} demo`}</button>
    </div>
  );
}

export default App;
