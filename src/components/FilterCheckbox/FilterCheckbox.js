import { useState } from 'react';
import './FilterCheckbox.css';
import Preloader from '../Preloader/Preloader';

function FilterCheckbox() {
  const [toggle, setToggle] = useState(false);

  function toggleCheckBox() {
    setToggle((prevState) => !prevState);
  }

  return (
    <>
    <div className='filter-checkbox'>
      <p className='filter-checkbox__text'>Короткометражки</p>
      <label className='filter-checkbox__toggle'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          id='toggle'
          onChange={toggleCheckBox}
        />
        <span className='filter-checkbox__input-visible'></span>
      </label>
    </div>
    {toggle && <Preloader />}
    </>
  );
}

export default FilterCheckbox;
