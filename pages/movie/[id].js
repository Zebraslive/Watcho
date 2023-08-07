import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import useSWR from 'swr';
import Head from 'next/head';
import OffersModal from '../../components/OffersModal'

import FilmCasts from '../../components/FilmCasts'
import FilmGenres from '../../components/FilmGenres'
import FilmHeading from '../../components/FilmHeading'
import FilmImage from '../../components/FilmImage'
import FilmInfo from '../../components/FilmInfo'
import FilmRating from '../../components/FilmRating'
import FilmResources from '../../components/FilmResources'
import FilmSynopsis from '../../components/FilmSynopsis'
import Loading from '../../components/Loading'
import SearchBar from '../../components/SearchBar'

import { fetcher, pathToSearchMovie } from '../../utils'
import { TMDB_IMAGE_ENDPOINT, TMDB_IMAGE_ENDPOINT_small_poster } from '../../utils'


export default function Movie() {
  const router = useRouter()
  let {id} = router.query;

  let movieSlug = '';
  let extractedId = null;

  // Check if the id contains any hyphens
  const hasHyphens = id?.includes('-'); // Use optional chaining operator to avoid accessing properties of undefined

  if (hasHyphens) {
    // Follow the regular expression-based approach for ID with hyphens
    const hyphenSeparatedPattern = /-(\d+)$/; // Regular expression to match the ID at the end of the slug
    const segments = id.split('-');
    const lastSegment = segments[segments.length - 1];
    const isLastSegmentOnlyDigits = /^\d+$/.test(lastSegment);

    if (isLastSegmentOnlyDigits) {
      extractedId = lastSegment;
      movieSlug = segments.slice(0, -1).join('-'); // Join the remaining elements to form the movie slug
    }
  } else {
    // Consider the entire id as the numeric ID
    extractedId = id;
  }
  id = extractedId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: movie, error: movieError } = useSWR(`/api/movie/${id}`, fetcher)

  if (movieError) return <div>{movieError}</div>
  if (!movie) return <div>{movieError}</div>



  const handleWatchButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Head>
        <title>{movie.detail.title} | </title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      {movie ? (
  <section className="text-gray-400 bg-gray-900 body-font">
    <div className="border-gray-800 border border-b-0 container mx-auto px-4 lg:px-8">
      <div className="flex flex-wrap -mx-2">
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center p-4 rounded-lg">
            <img
              alt="team"
              className="bg-gray-100 flex-shrink-0 mr-4"
              src={`${TMDB_IMAGE_ENDPOINT_small_poster}/${movie.detail.poster_path}`}
              style={{ maxWidth: '100px' }}
            />
            <div className="mt-6 mb-2 text-center md:mt-0 md:mb-4 md:text-left">
              <h1 className="mb-1 text-3xl font-light md:mb-3 md:text-5xl">{movie.detail.title}</h1>
              <h2 className="text-xs font-light text-app-placeholder sm:text-sm md:text-lg">
                {movie.detail.tagline}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
) : (
  <Loading />
)}
      {movie ? (
        
        <section className='flex flex-col sm:mx-8 md:mx-0 md:flex-row md:items-start lg:justify-center'>
          {/* <FilmImage
            src={movie.detail.poster_path}
            title={movie.detail.title}
          /> */}
          <section className=''>
            {/* <FilmHeading
              tagline={movie.detail.tagline}
              title={movie.detail.title}
            /> */}
        <OffersModal trackingId={movie.detail.title} imdb_id={movie.detail.imdb_id} />
   
 
            <FilmRating number={renderRating(movie.detail.vote_average)} />
            <FilmInfo
              media_type='movie'
              language={renderLanguage(movie.detail.spoken_languages || [])}
              length={renderLength(movie.detail.runtime)}
              status={renderStatus(movie.detailstatus)}
              year={renderYear(movie.detail.release_date)}
            />
            <FilmGenres genres={movie.detail.genres || []} />
            <FilmSynopsis synopsis={movie.detail.overview} />
            <FilmCasts casts={movie.credits.cast} />
            <FilmResources
              website={movie.detail.homepage}
              imdb={movie.detail.imdb_id}
            />
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  )
}

export function renderRating(rating) {
  if (rating !== undefined) {
    return (rating / 2).toFixed(1)
  } else {
    return 0
  }
}

function renderLength(runtime) {
  if (runtime !== 0 && runtime !== undefined) {
    return runtime + ' min.'
  } else {
    return 'N/A'
  }
}

export function renderLanguage(languages) {
  if (languages.length !== 0) {
    return languages[0].name
  } else {
    return 'N/A'
  }
}

function renderYear(year) {
  if (!year) {
    return 'N/A'
  } else {
    return year.substring(0, 4)
  }
}

export function renderStatus(status) {
  if (!status) {
    return 'N/A'
  } else {
    return status
  }
}
