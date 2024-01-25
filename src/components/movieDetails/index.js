import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FaExpandArrowsAlt, FaHeart, FaPlay, FaStar } from 'react-icons/fa'
import { MdBookmarkAdd } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../API_KEY'
import { ImSpinner3 } from 'react-icons/im'
import Actors from '../actors'
import Videos from '../videos'
import Home from '../home'
import { languageContext } from '../context/RootContext'

const MovieDetails = () => {
	const { language, setLanguage } = useContext(languageContext)

	const [video, setVideo] = useState(false)
	const [modal, setModal] = useState(false)
	const [background, setBackground] = useState(false)
	const { id } = useParams()
	const [movieDetails, setMovieDetails] = useState({})
	const [loading, setLoading] = useState(true)
	const [HeartColor, setHeartColor] = useState(false)
	const getMovie = key => {
		axios(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=${language}`
		)
			.then(res => {
				console.log(res)
				setMovieDetails(res.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching movie details:', error)
				setLoading(false)
			})
	}

	useEffect(() => {
		getMovie(API_KEY)
	}, [id, language])
	// console.log(movieDetails)
	if (loading) {
		return (
			<div className='loading'>
				<h2>
					<ImSpinner3 />
				</h2>
				<h4>Loading...</h4>
			</div>
		)
	}
	// console.log(movieDetails.id)

	return (
		<div className='container'>
			<div
				className='moviDetails'
				style={{
					padding: '0px 50px',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%), url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}")`,
					height: '70vh',
					filter: video === true ? 'grayscale(100%)' : 'none'

					// filter: modal === true ? 'grayscale(100%)' : 'none'
				}}
			>
				<img
					onMouseEnter={() => {
						setBackground(true)
					}}
					onMouseLeave={() => {
						setBackground(false)
					}}
					style={{
						width: '300px',
						borderRadius: '20px',
						objectFit: 'cover'
					}}
					src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`}
					alt='img'
				/>
				<div className='movieInfo'>
					<h1>{movieDetails.title}</h1>
					<div className='movieGenger'>
						<h3>{movieDetails.release_date}</h3>
						<h3>
							{Math.floor(movieDetails.runtime / 60) +
								'h' +
								' ' +
								(movieDetails.runtime % 60) +
								'm'}
						</h3>
						<div className='genres'>
							{movieDetails.genres?.map(el => {
								return <h5 key={el.id}>{el.name}</h5>
							})}
						</div>
					</div>
					<div className='movieIcons'>
						<div className='popularity'>
							<div className='circle'>
								<h1>{Math.round(movieDetails.vote_average * 10)}</h1>
								<h5>%</h5>
							</div>
							<h2>Рейтинг</h2>
						</div>

						<button
							onClick={() => {
								setHeartColor(!HeartColor)
							}}
							style={{
								color: HeartColor === true ? 'red' : 'white'
							}}
						>
							<FaHeart />
						</button>
						<button>
							<MdBookmarkAdd />
						</button>
						<button>
							<FaStar />
						</button>
						<div
							className='play'
							onClick={() => {
								// style = { color: 'red' }
								setVideo(true)
							}}
						>
							<h2>
								<FaPlay />
							</h2>
							<h1>Воспроизвести трейлер</h1>
						</div>
					</div>
					<h3>{movieDetails.tagline}</h3>
					<h2>review</h2>
					<p>{movieDetails.overview}</p>
				</div>
			</div>
			<div
				className='bg'
				style={{
					transition: background === true ? '0.2s' : '1s',
					display: background === true ? 'block' : 'none',
					cursor: background === true ? 'pointer' : 'none'
					// zIndex: background === true ? '1' : '1'
				}}
				onClick={() => {
					setModal(true)
				}}
			>
				<h1>
					<FaExpandArrowsAlt />
				</h1>
				<h2> Расширить</h2>
			</div>
			<div
				className='modal'
				style={{
					display: modal === true ? 'inline-block' : 'none'
				}}
			>
				<img
					style={{
						width: '330px',
						objectFit: 'cover'
					}}
					src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`}
					alt='img'
				/>
				<button
					onClick={() => {
						setModal(false)
					}}
				>
					+
				</button>
				<div className='modal--info'>
					<h1>Info</h1>
					<h4>Основное?</h4>
					<h4>Размер</h4>
				</div>
			</div>
			<Actors movieId={id} />
			<Videos videoId={id} videoTreiler={video} setVideoTreiler={setVideo} />
		</div>
	)
}

export default MovieDetails
