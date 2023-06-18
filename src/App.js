import { useState } from 'react';
import './App.css';
var data = require('./MOCK_DATA.json');

function App() {

  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSelect = (selectedItem) => {
    setValue(selectedItem);
  }

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
  }

  return (
    <div className="App">
      <h1>Search</h1>
      <div className='search-container'>
        <div className='search-inner'>
          <input 
            type="text" 
            value={value}
            onChange={onChange}
          />
          <button
            onClick={() => onSearch(value)}
          >
            Search
          </button>
        </div>
        <div className='dropdown'>
          {data
          .filter(item => {
            const searchTerm = value.toLocaleLowerCase();
            const fullName = item.full_name.toLocaleLowerCase();
            return searchTerm && fullName.startsWith(searchTerm) && searchTerm !== fullName;
          })
          .slice(0, 10)
          .map((item) => (
              <div
                className='dropdown-row'
                onClick={() => onSelect(item.full_name)}
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
