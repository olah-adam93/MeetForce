import {useState} from 'react';

/* Style */
import './Style/FilterBar.css';

/* Fontawesome */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

/* Decoration */
import search_event_background from '../../others/decoration/search-3.svg';

const FilterBar = ({setSearchQuery, filterParams, setFilterParams, setToDefault}) => {
  const [searchValue, setSearchValue] = useState('');

  const resetHandler = () => {
    setToDefault(true);
    setFilterParams({
      location: '',
      price: '',
      date: '',
      type: '',
      category: '',
    });
    setSearchQuery(searchValue);
  };

  const selectHandler = (event) => {
    setToDefault(true);
    setFilterParams((prev) => ({...prev, [event.target.name]: event.target.value}));
  };

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
    console.log('search:', event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('submitted');

    if (searchValue !== '') {
      setToDefault(true);
    } else {
      setToDefault(false);
    }
    setSearchQuery(searchValue);
    setSearchValue('');
  };

  return (
    <div className='filter-container'>
      {/* Background Image */}
      {/* <img
        className='filter-bar-background'
        src={search_event_background}
        alt='search-event-background'
      /> */}

      <div className='search-bar-container'>
        <form className='search-bar-form' onSubmit={onSubmitHandler}>
          <input
            type='text'
            name='searchbar'
            placeholder='Search events'
            onChange={onChangeHandler}
            value={searchValue}
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        <button className='search-bar-reset-button' type='button' onClick={resetHandler}>
          Reset
        </button>
      </div>

      <div className='fiter-bar-container'>
        <form className='filter-bar-form'>
          <select name='location' onChange={selectHandler} value={filterParams?.location}>
            <option value=''>Any Location</option>
            <option value='online'>Online</option>
            <option value='venue'>In person</option>
          </select>
          <select name='price' onChange={selectHandler} value={filterParams?.price}>
            <option value=''>Price</option>
            <option value='free'>Free</option>
            <option value='ticket'>Paid</option>
          </select>
          <input
            type='date'
            name='date'
            onChange={selectHandler}
            value={filterParams?.date}
          />
          <select name='type' onChange={selectHandler} value={filterParams?.type}>
            <option value=''>Any Type</option>
            <option value='trip'>Trip</option>
            <option value='workshop'>Workshop</option>
            <option value='performance'>Concer or Performance</option>
            <option value='conference'>Conference</option>
            <option value='dinner'>Dinner or Gala</option>
            <option value='festival'>Festival or Fair</option>
            <option value='game'>Game</option>
            <option value='meeting'>Meeting</option>
            <option value='party'>Party</option>
            <option value='seminar'>Seminar or Talk</option>
            <option value='tournament'>Tournament</option>
            <option value='other'>Other</option>
          </select>
          <select name='category' onChange={selectHandler} value={filterParams?.category}>
            <option value=''>Any Category</option>
            <option value='business'>Business and Professional</option>
            <option value='charity'>Charity</option>
            <option value='community'>Community or Culture</option>
            <option value='family'>Family</option>
            <option value='education'>Education</option>
            <option value='fashion'>Fashion or Beauty</option>
            <option value='food-or-drink'>Food or Drink</option>
            <option value='health'>Health</option>
            <option value='music'>Music</option>
            <option value='religion'>Religion</option>
            <option value='science'>Science and Technology</option>
            <option value='holiday'>Holiday</option>
            <option value='sports'>Sports</option>
            <option value='travel'>Travel</option>
            <option value='other'>Other</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;
