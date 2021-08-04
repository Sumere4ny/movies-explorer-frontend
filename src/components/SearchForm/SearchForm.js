import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchIcon from '../../images/search-icon.svg';
import './SearchForm.css';

function SearchForm() {
  const [focus, setFocuse] = useState(false);

  function setInputFocus() {
    setFocuse((state) => true);
  }

  function unsetInputFocus() {
    setFocuse((state) => false);
  }

  document.onclick = function(e){
    if ( e.target.className != 'search__form-input' ) {
        unsetInputFocus();
    };
};

  return (
    <section className='search'>
      <form className={`search__form ${focus && 'search__form_focus'}`}>
        <img className="search__form-icon" src={SearchIcon} alt="Поиск" />
        <input className='search__form-input' 
          onFocus={setInputFocus} 
          placeholder='Фильм' 
          required></input>
        <button className='search__form-submit-btn link'>Найти</button>
      </form>

      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
