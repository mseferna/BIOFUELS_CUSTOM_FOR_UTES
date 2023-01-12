import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './routes/Home'
import SettingsTLS from './routes/SettingsTLS'
import SettingsTank from './routes/SettingsTank'
import Nav from './components/Nav'
import SettingsRelay from './routes/SettingsRelay'

function App() {
	return (
		<div className="App">
			<header>
				<Nav />
			</header>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/relay_settings' element={<SettingsRelay />} />
				<Route path='/tls_settings' element={<SettingsTLS />} />
				<Route path='/tank_settings' element={<SettingsTank />} />
				<Route path='*' element={<h1>Not Found</h1>} />
			</Routes>
		</div>


	)
}

export default App
