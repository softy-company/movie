import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { API_KEY } from '../../API_KEY'
import MovieCard from '../movieCard'
import { ImSpinner3 } from 'react-icons/im'
import { languageContext } from '../context/RootContext'

const Popular = () => {
	// let page = 1
	const { language } = useContext(languageContext)
	console.log(language)

	const [loading, setLoading] = useState(true)
	const [movie, setMovie] = useState([])
	const [page, setPage] = useState(1)

	function getMovie() {
		axios(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}}&page=${page}`
		)
			.then(res => {
				setMovie(res.data.results)
			})
			.catch(error => {
				console.error('Error fetching movie details:', error)
				setLoading(false)
			})
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
	}
	useEffect(() => {
		getMovie()
	}, [page, language])
	// console.log(movie)
	// console.log(page)
	return (
		<div className='container'>
			<div className='blocks'>
				{movie.map((el, id) => (
					<MovieCard el={el} key={id} />
				))}
				<button
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px'
					}}
					onClick={() => {
						setPage(page + 1)
						// console.log(input.value);
						// window.location.reload()
					}}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default Popular
