import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { imageBaseUrl } from '../constants/movie'
import { Movie } from '../typings'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div className=" relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out">
      <Image
        src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        onClick={() => {
          setCurrentMovie(movie)
          setShowModal(true)
        }}
      />
    </div>
  )
}

export default Thumbnail
