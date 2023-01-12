import React from 'react'
import { Link } from 'react-router-dom'

function nav() {
	return (
		<nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<span className="font-semibold text-xl tracking-tight">TLS Controller - UTEs</span>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					<Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-sans" to='/'>Alarms</Link>
				</div>
				<div className="text-sm lg:flex-grow">
					<Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-sans" to='/relay_settings'>Relay Comm</Link>
				</div>
				<div className="text-sm lg:flex-grow">
					<Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-sans" to='/tls_settings'>Tls Comm</Link>
				</div>
				<div className="text-sm lg:flex-grow">
					<Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 font-sans" to='/tank_settings'>Tanks</Link>
				</div>
			</div>
		</nav>
	)
}

export default nav