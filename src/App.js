import React, { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [clickedItems, setClickedItems] = useState([]);
  const [completed, setCompleted] = useState(false);

  // Check if all items have been clicked and set completed state
  useEffect(() => {
    if (clickedItems.length === 9) {
      setCompleted(true);  
    }
    let intervalId;
    if (completed) {
      let i = 0;
      intervalId = setInterval(() => {
        if (i === clickedItems.length) {
          clearInterval(intervalId);
          setClickedItems([]);
          setCompleted(false);
        } else {
          const index = clickedItems[i];
     
          //every we remove the first item in the array 
          setClickedItems(prevClickedItems => prevClickedItems.filter(itemIndex => itemIndex !== index));
          
        }
      }, 300);
    }
    return () => clearInterval(intervalId);
  }, [clickedItems, completed]);

  // Use setInterval to remove background color from clicked items one by one
 
  function handleClick(index) {
    if (clickedItems.includes(index)) return
      setClickedItems([...clickedItems, index]);
    
  } 

  return (
    <div className="grid">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
        <div
          key={index}
          className={`item ${clickedItems.includes(index) ? 'selected' : ''}`}
          style={{pointerEvents : completed ? "none" :" "}}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}


export default App;
