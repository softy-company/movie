import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../API_KEY'
import { Link } from 'react-router-dom'
import { ImSpinner3 } from 'react-icons/im'
import user from '../illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
import Videos from '../videos'
import ActorsInfo from '../actorsInfo'

const Actors = ({ movieId }) => {
	const [actorInfo, setActorInfo] = useState(false)
	const { id } = useParams()
	const [actors, setActors] = useState([])
	const [loading, setLoading] = useState(true)

	const getActors = key => {
		axios(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
		)
			.then(res => {
				setActors(res.data.cast)
				// console.log(res.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching movie details:', error)
				setLoading(false)
			})
	}

	useEffect(() => {
		getActors(API_KEY)
	}, [id])

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
	return (
		<div className='container'>
			<div className='actors'>
				{actors.map(el => (
					<div className='actorsBlock'>
						{el.profile_path === null ? (
							<img src={user} alt='' />
						) : (
							<Link to={`/ActorsInfo/${el.id}`}>
								<img
									onClick={() => {
										setActorInfo(true)
									}}
									key={el}
									src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.profile_path}`}
									alt='img'
								/>
							</Link>
						)}
						<h1>{el.name}</h1>
					</div>
				))}
			</div>
			<div
				className='actorsInfo'
				style={{
					display: actorInfo === true ? 'block' : 'none'
				}}
			>
				{}
			</div>
			{
				// <ActorsInfo personId={id}/>
				// actors.cast.map(el => (
				// 	<h1>{el.name}</h1>
				// ))
			}
		</div>
	)
}

export default Actors
