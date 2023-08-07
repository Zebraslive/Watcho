import { useRouter } from 'next/router'
import CardImage from './CardImage'
import CardInfo from './CardInfo'
function convertToSlug(title, id) {
  // Step 1: Remove special characters and convert to lowercase
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Trim any leading/trailing spaces

  // Step 2: Replace spaces with hyphens
  const movieSlug = slug.replace(/\s+/g, '-');

  // Step 3: Append the id to the slug
  return id ? `${movieSlug}-${id}` : movieSlug;
}
export default function CardNormal({ id, category, rating, src, title, year }) {
  const router = useRouter()
var slugxzii = convertToSlug(title, id);
  const handleClick = () => {
    if (category === 'movie') {
      router.push(`/movie/${slugxzii}`)
    } else if (category === 'tv') {
      router.push(`/tv/${slugxzii}`)
    }
  }

  return (
    <div
      className='card-hover-animation mb-4 grow basis-1/5 2xs:w-[130px] xs:w-full cursor-pointer'
      onClick={handleClick}>
      <CardImage src={src} alt={title} />
      <CardInfo
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
      />
    </div>
  )
}
