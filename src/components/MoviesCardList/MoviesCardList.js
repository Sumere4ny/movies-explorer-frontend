import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
        MOBILE_RESOLUTION, 
        TABLET_RESOLUTION, 
        MAX_MOVIES_TO_RENDER,
        MOVIES_PAGE, 
      } from '../../utils/constants';
import { NO_SHORT_MOVIES_RESULTS } from '../../utils/responseMessages';
import { filterShortMovies } from '../../utils/helperFunctions';

function MoviesCardList({
  moviesSearchResults,
  savedMoviesSearchResults,
  loader,
  noResultsToShow,
  noResultsMessage,
  handleSaveMovie,
  savedMoviesList,
  errorMessage,
  shortMovieFilter,
}) {
  const location = useLocation();
  const [extraPortion, setExtraPortion] = useState(3)
  const [currentCount, setCurrenCount] = useState(0)
  const [renderMovies, setRenderMovies] = useState([])

  function getCount(windowSize) {
    if (windowSize > TABLET_RESOLUTION) {
      return { first: MAX_MOVIES_TO_RENDER.desktop, extra: 3 }
    } else if (windowSize > MOBILE_RESOLUTION) {
      return { first: MAX_MOVIES_TO_RENDER.tablet, extra: 2 }
    } else {
      return { first: MAX_MOVIES_TO_RENDER.mobile, extra: 2 }
    }
  }

  function renderExtraPortion() {
    const count = Math.min(moviesData.length, currentCount + extraPortion)
    const extraMovies = moviesData.slice(currentCount, count)
    setRenderMovies([...renderMovies, ...extraMovies])
    setCurrenCount(count)
  }

  function handleResize() {
    const windowSize = window.innerWidth
    const sizePortion = getCount(windowSize)
    setExtraPortion(sizePortion.extra)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, )

  const moviesData = arrangeMoviesForRender(
    moviesSearchResults,
    savedMoviesSearchResults,
    savedMoviesList
  );

  useEffect(() => {
    const windowSize = window.innerWidth
    const sizePortion = getCount(windowSize)
    setExtraPortion(sizePortion.extra)
    const count = Math.min(moviesData.length, sizePortion.first)
    setRenderMovies(moviesData.slice(0, count))
    setCurrenCount(count)
  }, [moviesData])

  function handleMoreCards() {
    renderExtraPortion()
  }

  function arrangeMoviesForRender(moviesSearchResults, savedMoviesSearchResults, savedMoviesList) {
    if (!shortMovieFilter) {
      return location.pathname === MOVIES_PAGE
        ? moviesSearchResults || []
        : savedMoviesSearchResults.length > 0
        ? savedMoviesSearchResults
        : savedMoviesList;
    } else {
      return location.pathname === MOVIES_PAGE
        ? filterShortMovies(moviesSearchResults) || []
        : savedMoviesSearchResults.length > 0
        ? filterShortMovies(savedMoviesSearchResults)
        : filterShortMovies(savedMoviesList);
    }
  }

  return (
    <section className='movies-card'>
      {loader && <Preloader />}

      {shortMovieFilter && !loader && renderMovies.length === 0 && (
        <div className='movies-card__no-search-results'>
          <p className='movies-card__no-search-results-text'>{NO_SHORT_MOVIES_RESULTS}</p>
        </div>
      )}

      {!loader && shortMovieFilter && noResultsToShow && (
        <div className='movies-card__no-search-results'>
          <p className='movies-card__no-search-results-text'>{NO_SHORT_MOVIES_RESULTS}</p>
        </div>
      )}

      {!loader && noResultsToShow && !shortMovieFilter && (
        <div className='movies-card__no-search-results'>
          <p className='movies-card__no-search-results-text'>{noResultsMessage}</p>
        </div>
      )}

      {!loader && errorMessage && (
        <div className='movies-card__no-search-results'>
          <p className='movies-card__no-search-results-text'>{errorMessage}</p>
        </div>
      )}

      <div className='movies-card__list-container movies-card__list-container_hidden'>
        <ul className='movies-card__list'>
          {!loader &&
            !noResultsToShow &&
            renderMovies.map((movie) => (
              <MoviesCard
                key={movie.id || movie._id}
                movieCard={movie}
                handleSaveMovie={handleSaveMovie}
                savedMoviesList={savedMoviesList}
              />
            ))}
        </ul>
        {currentCount < moviesData.length && !loader && (
          <button
            className='movies-card__show-more-btn link'
            type='button'
            onClick={handleMoreCards}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
