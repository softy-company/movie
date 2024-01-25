import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../movieCard'
import { API_KEY } from '../../API_KEY'
import { languageContext } from '../context/RootContext'

const TopRated = () => {
	const { language, setLanguage } = useContext(languageContext)

	const [topRated, setTopRated] = useState([])
	const getTopRated = key => {
		axios(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=${language}&page=1`
		).then(res => {
			// console.log(res.data)
			setTopRated(res.data.results)
		})
	}
	console.log(topRated)
	useEffect(() => {
		getTopRated(API_KEY)
	}, [language])
	return (
		<div className='container'>
			<div className='blocks'>
				{topRated.map((el, id) => (
					// <MovieCard/>
					<MovieCard el={el} />
				))}
			</div>
		</div>
	)
}

export default TopRated
