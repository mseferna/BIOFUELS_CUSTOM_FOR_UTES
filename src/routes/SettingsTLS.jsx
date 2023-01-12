
import React, { useState, useEffect } from 'react'

function SettingsTLS() {

	const [isEnabled, setIsEnabled] = useState(true);
	const [currentParams, setCurrentParams] = useState({})
	const [host, setHost] = useState('');
	const [port, setPort] = useState('');
	const [depositoId, setDepositoId] = useState('');
	const [apiResponse, setApiResponse] = useState('');

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ host, port, depositoId })

	}

	useEffect(() => {
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/get_config/`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(json => { setCurrentParams(json); console.log(json) })
	}, [])


	const handleIsEnabled = (value) => setIsEnabled(value);
	const handleUpdate = () => {
		console.log(JSON.stringify({ host, port, depositoId }))
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/set_config/`, requestOptions)
			.then(res => res.json())
			.then(response => setApiResponse(response))
			.finally(() => alert(`TLS Params - Response: ${apiResponse}`))
	}

	return (
		<div className="flex flex-column justify-center">
		<div className="flex-1 rounded overflow-hidden shadow-lg mt-5">
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-20">TLS Connection Parameters</div>

				<form className="w-full">
					<div className="md:flex md:items-center xl:items-center mb-6">
						<div className="md:w-1/3" >
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="host">
								Server IP
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
								Server Port
							</label>
						</div>
						<div className="md:w-1/3">
							<input disabled={isEnabled} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								name="port"
								type="text"
								placeholder={currentParams?.port ? currentParams.port : port}
								value={port}
								onChange={(e) => setPort(e.target.value)}

							/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="deposito_id">
								Depósito ID(FuelOnet)
							</label>
						</div>
						<div className="md:w-1/3">
							<input disabled={isEnabled} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								name="deposito_id"
								type="number"
								placeholder={currentParams?.depositoId ? currentParams.depositoId : depositoId}
								value={depositoId}
								onChange={(e) => { setDepositoId(parseInt(e.target.value)) }}

							//placeholder={currentParams.depositoId}
							/>
						</div>

					</div>
					<div className="md:flex md:items-center mt-20">
						<div className="md:w-1/3"></div>
						<div className="md:w-1/3">
							<button className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
								type="button"
								onClick={() => handleUpdate()}
							>
								Update
							</button>
							<button
								className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-5 rounded"
								type="button"
								onClick={() => {
									handleIsEnabled(false);
									console.log("lala");
								}}
							>
								Modify
							</button>
						</div>
					</div>
					<div className="mt-20"></div>
					{/* <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4 mt-10">Response: {apiResponse}</label> */}
				</form>
			</div>
			<div className="px-6 pt-4 pb-2">

			</div>
		</div>
		</div>
	)
}

export default SettingsTLS