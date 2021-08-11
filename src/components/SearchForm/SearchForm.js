import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import SearchIcon from '../../images/search-icon.svg';
import './SearchForm.css';

function SearchForm({ handleSearchClick, toggleShortMovieFilter }) {
  const [focus, setFocuse] = useState(false);
  const { inputValues, handleChange } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');
  const searchQuery = inputValues.name;

  function setInputFocus() {
    setFocuse((state) => true);
    hideErrorMessage();
  }

  function unsetInputFocus() {
    setFocuse((state) => false);
  }

  document.onclick = function(e) {
    if ( e.target.className !== 'search__form-input' ) {
      unsetInputFocus();
    };
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery) {
      handleSearchClick(searchQuery);
      hideErrorMessage();
    } else {
      showErrorMessage();
    }
  }

  useEffect(() => {
    if (searchQuery !== '') {
      hideErrorMessage();
    } else {
      showErrorMessage();
    }
  }, [searchQuery]);

  function hideErrorMessage() {
    setErrorMessage('');
  }

  function showErrorMessage() {
    setErrorMessage('Введите ключевое слово для поиска');
  }

  return (
    <section className='search'>
      <form className={`search__form ${focus && 'search__form_focus'}`} 
        onSubmit={handleSubmit} noValidate>
        <img className="search__form-icon" src={SearchIcon} alt="Поиск" />
        <input 
        className='search__form-input' 
          name='name'
          placeholder='Фильм'
          value={inputValues.name || ''}
          onChange={handleChange}
          type='text'
          onFocus={setInputFocus}
          onBlur={hideErrorMessage} 
          required></input>
        <button className='search__form-submit-btn link' type='submit'>
          Найти
        </button>        
      </form>
      <span className={`search__input-error_hidden ${errorMessage && 'search__input-error'}`}>
          {errorMessage}
      </span>
      <FilterCheckbox toggleShortMovieFilter={toggleShortMovieFilter} />
    </section>
  );
}

export default SearchForm;
