import React, { useState } from 'react'

function App() {
  const [ state, setState ] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  return (
    <div className="App">
      hi
    </div>
  );
}

export default App;
