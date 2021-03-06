import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import listIconProfile from '../../images/list-icon-profile.svg';
import './Navigation.css';

function Navigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleNavClick() {
    setIsNavOpen((prevState) => !prevState);
  }

  return (
    <div className='navigation'>
      <button
        className={`navigation__hamburger-btn navigation__hamburger-btn_hidden link ${
          isNavOpen && 'navigation__close-btn_active'
        }`}
        type='button'
        onClick={handleNavClick}
      ></button>

      <nav
        className={`navigation__container navigation__container_hidden ${
          isNavOpen && 'navigation__container_active'
        }`}
      >
        <ul className='navigation__list'>
          
          <li className='navigation__list-item'>
            <NavLink
              className='navigation__list-item-link link'
              to='/movies'
              activeClassName='navigation__list-item-link_active'
            >
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__list-item'>
            <NavLink
              className='navigation__list-item-link link'
              to='/saved-movies'
              activeClassName='navigation__list-item-link_active'
            >
              Сохранённые фильмы
            </NavLink>
          </li>
         
         
          <li className='navigation__list-item'>
            <NavLink
              className='navigation__list-item-link navigation__list-item-profile link'
              to='/profile'
            >
              {/* <div style={{display: 'flex', justifyContent: 'space-between'}}> */}
                <p>Аккаунт</p>
                <img className='navigation__list-icon-profile' src={listIconProfile} alt='Профиль' />
              {/* </div> */}
            </NavLink>
          </li>        
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
