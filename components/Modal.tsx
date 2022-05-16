import {
  VolumeUpIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  XIcon,
} from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Genre, Movie } from '../typings'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)

  const handleClose = () => setShowModal(false)

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      console.log('data', data)
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 right-0 left-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className={
            'modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'
          }
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing={false}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center justify-center gap-x-2 rounded bg-white px-8 font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                <PlusIcon />
              </button>

              <button className="modalButton">
                <ThumbUpIcon />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
