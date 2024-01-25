import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { movieNull } from "../images.jpg";
import movieNull from '../images.jpg'

const MovieCard = ({ el }) => {
	const [overview, setOverview] = useState('')
	const getOverview = () => {
		setOverview(el)
	}
	useEffect(() => {
		getOverview()
	}, [overview])
	// console.log(overview.overview)
	if (overview.overview?.slice().length > 500) {
		overview.overview.slice(0, 500)
	}

	// setOverview(el.overview)
	// console.log(overview)
	// console.log(text);
	return (
		<div className='block'>
			{el.profile_path === null ? (
				<img src={movieNull} alt='aza' />
			) : (
				<Link to={`/movieDetails/${el.id}`}>
					<img
						style={{
							objectFit: 'cover',
							width: '200px',
							height: '240px'
						}}
						src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${el.poster_path}`}
						alt='img'
					/>
				</Link>
			)}

			<h1>{el.title}</h1>
			<p>{overview.overview}</p>
		</div>
	)
}

export default MovieCard
