import './App.css';
import { useState } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  const history = useHistory();
  const [tooltipStatus, setTooltipStatus] = useState('');

  function onRegister() {
    setTooltipStatus('success');
    history.push('/signin');
  }

  function onLogin() {
    history.push('/movies');
  }

  function goBack() {
    history.goBack();
  }

  function closeAllPopups() {
    setTooltipStatus('');
  }

  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>

        <Route path='/signup'>
          <Header />
          <Register onRegister={onRegister} />
        </Route>

        <Route path='/signin'>
          <Header />
          <Login onLogin={onLogin} />
        </Route>
 
        <Route path='/movies'>
          <Header />
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path='/profile'>
          <Header />
          <Profile />
        </Route>

        <Route path='*'>
          <PageNotFound goBack={goBack} />
        </Route>
      </Switch>

      <InfoTooltip status={tooltipStatus} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
