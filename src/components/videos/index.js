import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../API_KEY'

const Videos = ({ videoId, videoTreiler, setVideoTreiler }) => {
	const [videos, setVideos] = useState([])

	const getVideos = key => {
		axios(
			`https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${key}&language=en-US`
		).then(res => {
			setVideos(res.data.results)
		})
	}

	useEffect(() => {
		getVideos(API_KEY)
	}, [videoId])

	const closeModal = () => {
		setVideoTreiler(false)
		const iframe = document.getElementById('video-iframe')
		if (iframe) {
			// const src = iframe.src
			iframe.src = ''
			// iframe.src = src
		}
	}

	return (
		<div
			className='video'
			style={{
				display: videoTreiler === true ? 'block ' : 'none',
				transition: '0.3s'
			}}
		>
			<div className='video__nav'>
				<h1>Воспроизвести трейлер</h1>
				<button onClick={closeModal}>+</button>
			</div>
			{videos.slice(0, 1).map(el => (
				<iframe
					id='video-iframe'
					key={el}
					width='981'
					height='600'
					src={`https://www.youtube.com/embed/${el.key}`}
					title={el.name}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				></iframe>
			))}
		</div>
	)
}

export default Videos
