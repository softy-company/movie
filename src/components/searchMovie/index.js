import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../API_KEY'
import MovieCard from '../movieCard'

const SearchMovie = () => {
	const [search, setSearch] = useState([])
	const { movieName } = useParams()
	const getSearchMovie = key => {
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`
		).then(res => {
			setSearch(res.data.results)
			// console.log(res)
		})
	}
	useEffect(() => {
		getSearchMovie(API_KEY)
	}, [search])
	console.log(search)
	// console.log(name)

	return (
		<div className='blocks'>
			{search.map(el => (
				<MovieCard el={el} />
			))}
		</div>
	)
}

export default SearchMovie
