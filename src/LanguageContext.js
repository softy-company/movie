import { createContext, useState } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('ru')

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}

export default LanguageContext
