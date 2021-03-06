import './Profile.css';
import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Preloader from '../Preloader/Preloader';

function Profile({ updateUserProfile, onSignOut, loader }) {
  const { inputValues, handleChange, errors, isValid } = useFormWithValidation();
  const { name, email } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { name: inputValues.name || name, email: inputValues.email || email };
    updateUserProfile(userData);
    setNoNameChanges(true);
    setNoEmailChanges(true);
  }

  const [noNameChanges, setNoNameChanges] = useState(true);
  const [noEmailChanges, setNoEmailChanges] = useState(true);

  function checkNameChange(e) {
    handleChange(e);
    name === e.target.value ? setNoNameChanges(true) : setNoNameChanges(false);
  }

  function checkEmailChange(e) {
    handleChange(e);
    email === e.target.value ? setNoEmailChanges(true) : setNoEmailChanges(false);
  }

  function handleSignOut() {
    onSignOut();
  }

  return (
    <section className='profile'>
      {loader && <Preloader />}
      <form className='profile__form' onSubmit={handleSubmit} noValidate>
        <h2 className='profile__title'>{`Привет, ${name || 'Неизвестный'}!`}</h2>
        <div className='profile__container'>
          <label className='profile__label'>
            <div className='profile__label-container'>
              <p className='profile__input-title'>Имя</p>
              <input
                id='name__input'
                type='text'
                name='name'
                defaultValue={name}
                placeholder='Изменить имя'
                className='profile__field'
                minLength='2'
                maxLength='200'
                required
                onChange={checkNameChange}
              />
            </div>

            <span id='profile__input-error' className='profile__input-error-text'>
              {errors.name}
            </span>
          </label>

          <label className='profile__label'>
            <div className='profile__label-container'>
              <p className='profile__input-title'>E-mail</p>
              <input
                id='email__input'
                type='email'
                name='email'
                defaultValue={email}
                placeholder='Изменить E-mail'
                className='profile__field'
                minLength='1'
                maxLength='40'
                required
                onChange={checkEmailChange}
              />
            </div>

            <span id='profile__input-error' className='profile__input-error-text'>
              {errors.email}
            </span>
          </label>
        </div>
        <button
          className='profile__edit-button link'
          type='submit'
          disabled={!isValid || (noNameChanges && noEmailChanges)}
        >
          Редактировать
        </button>

        <button className='profile__signout-btn link' type='button' onClick={handleSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
