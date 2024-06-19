import React, { useState } from 'react';
import ClientListForm from './Form.jsx';
import AddVisit from './AddVisit.jsx';

function MainForm() {
  const [showAddVisit, setshowAddVisit] = useState(false);

  return (
    <div className="App">
      {!showAddVisit ? (
          <ClientListForm switchComponent={() => setshowAddVisit(true)} />
        ) : (
        <AddVisit switchComponent={() => setshowAddVisit(false)} className={'active'}/>
      )}
    </div>
  );
}

export default MainForm;
