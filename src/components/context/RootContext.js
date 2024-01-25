import React, { useState, createContext, useContext } from 'react'

export const languageContext = createContext()

const RootContext = ({ children }) => {
	const [language, setLanguage] = useState('en-US')
  const [theme, setTheme] = useState(false)
	console.log(children)

	return (
		<languageContext.Provider value={{ 
      language,
       setLanguage ,
       theme,
       setTheme
       }}>
			{children}
		</languageContext.Provider>
	)
}

export default RootContext
