import React, { useState, useRef, useEffect } from 'react'
import SwitchBtns from '../components/SwitchBtns';
import TankModal from '../components/TankModal';
import useFetchGet from '../hooks/useFetch';

function SettingsTank() {
	const [refresh, setRefresh] = useState()
	
	const [selectedTank, setSelectedTank] = useState({
		//id: "",
        number: "",
        product_name: "",
        probe_number: "",
        capacity: "",
        //monitoring: "",
        threshold: ""
	})
	const [displayModal, setDisplayModal] = useState(true)
	const {data} = useFetchGet('GET', `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/get_tank/all/`, refresh, displayModal)
	const handleModal = (value) => setDisplayModal(value)

	const handleSwitch = (id, position) => {
		setTankMonitoring(id, position)
		setRefresh({})
	}

	const setTankMonitoring = (id, position) =>{
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/set_tank_monitoring/${id}/?monitoring=${position ? 1:0}`, requestOptions)
		.then(res => res.json())
		//.then((json) => console.log(json))
		return 
	}

	function handleDelete(tank) {
		if (window.confirm(`Delete Tank ${tank.number}, ${tank.product_name}?`)) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			}
			fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/delete_tank/${tank.id}/`, requestOptions)
				.then(res => res.json())
				.then(() => setRefresh({}))
		}
		return
	}


	const fillTanktable = () => {
		return (
			data.map((tank, index) =>
				<tr className="bg-white border-b" key={index}>
					<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">{tank.number}</th>
					<td className="py-4 px-6">{tank.product_name}</td>
					<td className="py-4 px-6">{tank.probe_number}</td>
					<td className="py-4 px-6">{tank.capacity} L</td>
					<td className="py-4 px-6">{'< '}{tank.threshold} L</td>
					<td className="py-4 px-6">
						<button
							className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="button"
							onClick={() => {handleModal(false); setSelectedTank({...tank, action: "update"})}}>Edit
						</button>
						<button
							className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-5 rounded"
							type="button"
							onClick={() => handleDelete(tank)}>Delete
						</button>
						
					</td>
					<td className="py-4 px-6">
						<div className="flex content-center">
							<SwitchBtns initialState={tank.monitoring} index={index} onChange={handleSwitch} id={tank.id}/>
							{
								tank.monitoring == 1 
								? <span className="ml-5 text-red-500">Active</span>
								: <span className="ml-5 text-green-500">Stand By</span>
							}
						</div>
						
					</td>
				</tr>
			)
		)
	}

	return (
		<>
			<div className="max-w rounded overflow-hidden shadow-lg mt-5 static">
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-20">Tanks

					</div>
					<div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
						<div className="flex justify-end mb-5">
							<button
								className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
								type="button"
								onClick={() => {handleModal(false); setSelectedTank({number: "",product_name: "",probe_number: "",capacity: "",threshold: "", action: "create"})}}>+
							</button>
						</div>
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shrink mb-20">
							<thead className="text-xs text-white uppercase bg-gray-800 ">
								<tr>
									<th scope="col" className="py-3 px-6">Number</th>
									<th scope="col" className="py-3 px-6">Product</th>
									<th scope="col" className="py-3 px-6">Probe Number</th>
									<th scope="col" className="py-3 px-6">Capacity</th>
									<th scope="col" className="py-3 px-6">threshold</th>
									<th scope="col" className="py-3 px-6">Actions</th>
									<th scope="col" className="py-3 px-6">Status</th>
								</tr>
							</thead>
							<tbody>
								{
									data.length > 0
										? fillTanktable()
										:<tr><th>No data</th></tr>
								}
							</tbody>
						</table>
					</div>
				</div>
				<TankModal handleModal={handleModal} displayModal={displayModal} selectedTank={selectedTank} setSelectedTank={setSelectedTank}/>
				{/* <TankModal handleModal={handleModal} displayModal={displayModal} setTankData={setTankData} tankData={tankData} /> */}
			</div>
			
		</>
	)
}

export default SettingsTank