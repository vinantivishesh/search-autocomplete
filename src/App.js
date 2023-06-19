import { useEffect, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import classnames from 'classnames';
import axios from 'axios';
import './App.css';

var data = require('./MOCK_DATA.json');

const URL = "https://jsonplaceholder.typicode.com/photos";

function App() {

  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce(value, 1000);
  const [data, setData] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const fetchData = async (q) => {
    let cancel;
    axios({
      method: "GET",
      url: `${URL}`,
      params: { q: q},
      // cancelToken: new axios.cancelToken((c) => (cancel = c))
    })
      .then((res) => {
        setLoading(false);
        setData(res.data.slice(0,10));
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
      })
  };

  useEffect (() => {
    if (debouncedSearch) {
      setLoading(true);
      fetchData(debouncedSearch);
    }
    else {
      setData([]);
    }
  }, [debouncedSearch])

  // useEffect (() => {
  //   fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));
  // });

  const onChange = (event) => {
    setValue(event.target.value);
    setSuggestionsActive(true);
  }

  const onSelect = (selectedItem) => {
    setSelectedItem(selectedItem);
    setValue(selectedItem.title);
    setSuggestionsActive(false);
  }

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
    setShowProfile(true);
  }

  const onReset = () => {
    setShowProfile(false);
    setValue('');
    setSuggestionsActive(false);
    setSelectedItem(null);
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
            placeholder='Search...'
          />
          <button
            onClick={() => onSearch(value)}
            disabled={selectedItem === null}
          >
            Search
          </button>
          <button
            onClick={onReset}
          >
            Reset
          </button>
        </div>
        {loading && <div>Loading...</div>}
        {suggestionsActive && 
          (<div className='dropdown'>
            {data
              .map((item) => (
                <div
                  className='dropdown-row'
                  onClick={() => onSelect(item)}
                  key={item.id}
                >
                  {item.title}
                </div>
              ))}
          </div>)
        }
        {showProfile && (
          <div>
            <img src={selectedItem.thumbnailUrl} alt={selectedItem.title}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
