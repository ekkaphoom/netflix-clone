import Image from 'next/image'
import React from 'react'
import { imageBaseUrl } from '../constants/movie'
import { Movie } from '../typeings'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  return (
    <div className=" relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out">
      <Image
        src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
