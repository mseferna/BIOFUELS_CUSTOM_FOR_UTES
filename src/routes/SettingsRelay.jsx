
import React, { useState, useEffect } from 'react'

function SettingsRelay() {

	const [isEnabled, setIsEnabled] = useState(true);
	const [currentParams, setCurrentParams] = useState({})
	const [host, setHost] = useState('');
	const [user, setPort] = useState('');
	const [password, setDepositoId] = useState('');
	const [apiResponse, setApiResponse] = useState('')

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ host, user, password })

	}

	useEffect(() => {
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/get_router_config/`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(json => { setCurrentParams(json); console.log(json) })
	}, [])

	const testRelay = (state) => {
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/relay/${state}/`, {method: 'GET'})
			.then(res => res.json())
			.then(response => setApiResponse(response) && alert(`Relay is ${state} - Response: ${apiResponse.response}`))
			.finally(() => alert(`Relay is ${state} - Response: ${apiResponse.response}`))
	}

	const handleIsEnabled = (value) => setIsEnabled(value);
	const handleUpdate = () => {
		console.log(JSON.stringify({ host, user, password }))
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/create_router/`, requestOptions)
			.then(res => res.json())
			.then(response => response ? setApiResponse('Ok') : setApiResponse('error!'))
	}

	return (
		<div className="flex flex-column justify-center">
		<div className="flex-1 rounded overflow-hidden shadow-lg mt-5">
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-20">Relay Parameters</div>

				<form className="w-full">
					<div className="md:flex md:items-center xl:items-center mb-6">
						<div className="md:w-1/3" >
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="host">
								Teltonika IP
							</label>
						</div>
						<div className="md:w-1/3">
							<input disabled={isEnabled} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								name="host"
								type="text"
								placeholder={currentParams?.host ? currentParams.host : ""}
								value={host}
								onChange={(e) => setHost(e.target.value)}
							/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="port">
								User
							</label>
						</div>
						<div className="md:w-1/3">
							<input disabled={isEnabled} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								name="user"
								type="text"
								placeholder={currentParams?.user ? currentParams.user : user}
								value={user}
								onChange={(e) => setPort(e.target.value)}

							/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="deposito_id">
								Key
							</label>
						</div>
						<div className="md:w-1/3">
							<input disabled={isEnabled} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								name="Key"
								type="password"
								placeholder="*********"
								value={password}
								onChange={(e) => { setDepositoId(e.target.value) }}

							//placeholder={currentParams.depositoId}
							/>
						</div>

					</div>
					<div className="md:flex md:items-center mt-20">
						<div className="md:w-1/4"></div>
						<div className="md:w-1/2">
							<button className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
								type="button"
								onClick={() => handleUpdate()}
							>Update
							</button>
							<button
								className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-5 rounded"
								type="button"
								onClick={() => {
									handleIsEnabled(false);
									console.log("lala");
								}}
							>Modify
							</button>
							
						</div>
					</div>
					<div className="flex flex-row justify-center mt-5">
					
					<button
							className="shadow bg-slate-600 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="button"
							onClick={() => testRelay("open")}
							disabled={currentParams ? false: true }
							>
							open
						</button>
						<button
							className="shadow  bg-slate-600 hover:bg-slate-500  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-5 rounded"
							type="button"
							onClick={() => testRelay("closed")}
							disabled={currentParams ? false: true }
							>
							close
						</button>
						
					</div>
				</form>
			</div>
			<div className="px-6 pt-4 pb-2">

			</div>
		</div>
		</div>
	)
}

export default SettingsRelay