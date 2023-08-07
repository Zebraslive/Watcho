import Link from 'next/link'
export default function FilmGenres({ genres, media_type }) {
  return (
    <div className='mb-6'>
      <h3 className='mb-2 md:text-lg'>Genres</h3>
      <ul className='flex flex-wrap text-xs font-light md:text-sm'>
        {renderGenres(genres, media_type)}
      </ul>
    </div>
  )
}

function renderGenres(arr, media_type) {
  if (arr.length !== 0) {
    return arr.map(genre => {
      return (
        <li
          key={genre.id}
          className='mr-2 mb-2 flex items-center justify-center rounded-md border-none bg-app-pure-white py-px px-2 text-center font-medium text-app-dark-blue cursor-pointer'
        >
          <Link
          key={genre.id}
          href={`/${media_type}/genre/${genre.id}?name=${genre.name}&page=1`}
          passHref>
         <a>{genre.name}</a>
        </Link>
        </li>
      )
    })
  } else {
    return 'N/A'
  }
}
