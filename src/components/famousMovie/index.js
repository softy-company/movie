import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImSpinner3 } from 'react-icons/im'
import { API_KEY } from '../../API_KEY'
import { Link } from 'react-router-dom'

const FamousMovie = ({ FamousMovieId }) => {
	const [loading, setLoading] = useState(true)
	const [famousMovie, setFamousMovie] = useState(null)

	async function getFamousMovie(key) {
		try {
			const res = await axios(
				`https://api.themoviedb.org/3/person/${FamousMovieId}/movie_credits?api_key=${key}&language=en-US`
			)
			setFamousMovie(res.data.cast)
		} catch (error) {
			console.error('Error fetching famous movie:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getFamousMovie(API_KEY)
	}, [FamousMovieId])

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

	if (!famousMovie || famousMovie.length === 0) {
		return <div>No famous movies found for this person.</div>
	}

	return (
		<div className='famousMovie'>
			{famousMovie.map(movie => (
				<div className='famousMovie--block' key={movie.id}>
					<Link to={`/movieDetails/${movie.id}`}>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
						/>
					</Link>
					<h1>{movie.title}</h1>
				</div>
			))}
		</div>
	)
}

export default FamousMovie
