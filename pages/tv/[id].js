import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
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
import { fetcher, pathToSearchTV } from '../../utils'
import { renderLanguage, renderRating, renderStatus } from '../movie/[id]'

export default function TV() {
  const router = useRouter()
  let { id } = router.query
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
  const { data: tv, error: tvError } = useSWR(`/api/tv/${id}`, fetcher)

  if (tvError) return <div>{tvError}</div>
  if (!tv) return <div>{tvError}</div>

  return (
    <>
      <Head>
        <title>Watch {tv.detail.name} online free | Watch Free Movies and Tv series online | Official Movieplug</title>
      </Head>
      <SearchBar
        placeholder='Search for TV series'
        searchPath={pathToSearchTV}
      />
      {tv ? (
        <section className='flex flex-col sm:mx-8 md:mx-0 md:flex-row md:items-start lg:justify-center'>
          <FilmImage src={tv.detail.poster_path} title={tv.detail.name} />
          <section className='md:w-3/5'>
            <FilmHeading tagline={tv.detail.tagline} title={tv.detail.name} />
            <FilmRating number={renderRating(tv.detail.vote_average)} />
            <FilmInfo
              media_type='tv'
              language={renderLanguage(tv.detail.spoken_languages || [])}
              firstAir={tv.detail.first_air_date}
              lastAir={tv.detail.last_air_date}
              status={renderStatus(tv.detail.status)}
            />
            <FilmGenres genres={tv.detail.genres || []} />
            <FilmSynopsis synopsis={tv.detail.overview} />
            <FilmCasts casts={tv.credits.cast} />
            <FilmResources
              website={tv.detail.homepage}
              imdb={tv.detail.imdb_id}
            />
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  )
}
