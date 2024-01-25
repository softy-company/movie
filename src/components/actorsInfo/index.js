import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../API_KEY'
import FamousMovie from '../famousMovie'
import { languageContext } from '../context/RootContext'

const ActorsInfo = () => {
	const { id } = useParams()
	const [actorInfo, setActorInfo] = useState([])
	const { language, setLanguage } = useContext(languageContext)

	const getActorsInfo = key => {
		axios(
			`https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=${language}`
		).then(res => {
			setActorInfo(res.data)
		})
	}
	useEffect(() => {
		getActorsInfo(API_KEY)
	}, [id, language])
	console.log(actorInfo)
	const newData = new Date()
	// console.log(typeof newData)

	return (
		<div>
			{/* {actorInfo.map(el => ( */}
			<div className='actorInfo'>
				<div className='actorInfoImg'>
					<img
						style={{}}
						src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actorInfo.profile_path}`}
						alt=''
					/>
					<h1>Персональная информация</h1>
					<>
						<h2>Известность за</h2>
						<h3>{actorInfo.known_for_department}</h3>
					</>
					<>
						<>
							<h2>Пол</h2>
							<h3>{actorInfo.gender === 2 ? 'Мужской' : 'Женский'}</h3>
						</>
						<h2>Дата рождения </h2>
						<h3> {actorInfo.birthday}</h3>
					</>
					<>
						<h2>Место рождения</h2>
						<h3>{actorInfo.place_of_birth}</h3>
					</>
					<>
						<h2>Также известность как</h2>
						{actorInfo.also_known_as?.map(el => (
							<h3 key={el}>{el}</h3>
						))}
					</>
				</div>
				<div className='actorInfo-Bio'>
					<h1>{actorInfo.name}</h1>
					<h2>Биография</h2>
					<p>{actorInfo.biography?.slice(0, 551)}</p>
					<>
						<h1>Известность за</h1>
						<FamousMovie FamousMovieId={id} />
					</>
				</div>
			</div>
			{/* ))} */}
		</div>
	)
}

export default ActorsInfo
