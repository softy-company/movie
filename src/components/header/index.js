import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { languageContext } from '../context/RootContext'
import { CiLight } from 'react-icons/ci'
import { MdDarkMode } from 'react-icons/md'

const Header = () => {
	const [value, setValue] = useState('')
	let nav = useNavigate()
	const { language, setLanguage } = useContext(languageContext)
	const { theme, setTheme } = useContext(languageContext)
	console.log(theme)

	const input = document.querySelector('input')

	// const handleChange = event => {
	// 	const value = event.target.value
	// 	setLanguage(value === 'ru' ? 'ru-RU' : 'us-US')
	// }

	// console.log(nav)
	// console.log(value)

	console.log(language)
	return (
		<header id='header'>
			<div className='container'>
				<div className='header'>
					<img
						style={{
							width: '154px',
							height: '20px'
						}}
						src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
						alt='The Movie Database (TMDB)'
					/>
					<div className='header-nav'>
						<NavLink to={'/'}>Home</NavLink>
						<NavLink to={'/popular'}>Popular</NavLink>
						<NavLink to={'/topRated'}>TopRated</NavLink>
					</div>
					<div className='search'>
						<input
							type='text'
							placeholder='search'
							onChange={e => setValue(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									nav(`/SearchMovie/${value}
                  
            `)
									input.value = ''
								}
							}}
						/>
						<button
							onClick={() => {
								nav(`/SearchMovie/${value}
            
            `)

								input.value = ''
							}}
						>
							<FaSearch />
						</button>
						<select
							onChange={e => {
								setLanguage(e.target.value)
							}}
						>
							<option value='en-US'>EN</option>
							<option value='ru-RU'>RU</option>
							<option value='zh-CN'>中文</option>
						</select>

						<button
							onClick={() => {
								setTheme(!theme)
							}}
							style={
								{
									// transition: '1s'
								}
							}
						>
							{theme ? <MdDarkMode /> : <CiLight />}
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
