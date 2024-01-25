import logo from './logo.svg'
import './App.scss'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Popular from './components/popular'
import TopRated from './components/topRated'
import MovieDetails from './components/movieDetails'
import ActorsInfo from './components/actorsInfo'
import SearchMovie from './components/searchMovie'
import { useContext, useState } from 'react'
import { languageContext } from './components/context/RootContext'
function App() {
	const { theme } = useContext(languageContext)
	// const [background, setBackground] = useState(theme)
	const body = document.querySelector('body')
	//  { theme ? body.style.background = 'black': 'white'}
	// console.log(body)
	// body.style.background = 'black'
	// console.log(background)
	// const { language } = useContext(languageContext)
	// console.log(language)
	return (
		<div
			className='App'
			style={{
				background: theme ? 'black' : 'none',
				transition: '0.6s'
			}}
		>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/popular' element={<Popular />} />
				<Route path='/topRated' element={<TopRated />} />
				<Route path='/movieDetails/:id' element={<MovieDetails />} />
				<Route path='/ActorsInfo/:id' element={<ActorsInfo />} />
				<Route path='/SearchMovie/:movieName' element={<SearchMovie />} />
			</Routes>
		</div>
	)
}

export default App
