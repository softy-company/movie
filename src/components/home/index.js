import React, { useContext, useEffect, useState } from 'react'
import Actors from '../actors'
import Videos from '../videos'
import axios from 'axios'
import { API_KEY } from '../../API_KEY'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { languageContext } from '../context/RootContext'

const Home = props => {
	const { language, setLanguage } = useContext(languageContext)
	const [home, setHome] = useState([])
	const [homeValue, setHomeValue] = useState('')
	let homeNav = useNavigate()
	const getHome = key => {
		axios(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=1}`
		).then(res => {
			setHome(res.data.results)
		})
	}
	useEffect(() => {
		getHome(API_KEY)
	}, [homeValue, language])
	// console.log(home)
	console.log(homeValue)
	// console.log(homeNav)
	// console.log(props)

	return (
		<div id='home'>
			<div className='container'>
				<div className='home'>
					<div
						className='home--search'
						style={{
							padding: '0px 50px',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `linear-gradient(to left, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 220px) - 440px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 10, 0.84)), url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces//hBIZ6RiaCWszRbdvHAy6RWHyT3c.jpg")`
						}}
					>
						<h1>
							Добро пожаловать в кинотеатр от Азирет.
							<br />
							<span>
								{' '}
								Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
							</span>
						</h1>
						<div className='searchInBtn'>
							<input
								type='text'
								placeholder='Найти фильм, сериал, персону....'
								onChange={e => {
									setHomeValue(e.target.value)
								}}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										homeNav(`/SearchMovie/${homeValue}`)
										setHomeValue('')
									}
								}}
							/>
							<button
								onClick={() => {
									homeNav(`/SearchMovie/${homeValue}`)
									setHomeValue('')
								}}
							>
								search
							</button>
						</div>
					</div>
					<div className='home--movies'>
						{home.map(el => (
							<div className='moviesBlock'>
								<div
									style={{
										border: '2px solid green'
									}}
									className='circle'
								>
									<h1>{Math.round(el.vote_average * 10) + '%'}</h1>
								</div>
								<Link to={`/movieDetails/${el.id}`}>
									<img
										src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${el.poster_path}`}
										alt='img'
									/>
								</Link>
								<NavLink to={`/movieDetails/${el.id}`}>
									<h2>{el.title}</h2>
								</NavLink>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
