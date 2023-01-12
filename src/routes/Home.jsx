import React, { useState} from 'react'
import AlarmModal from '../components/AlarmModal';
import useFetchGet from '../hooks/useFetch';
import Pagination from '../components/Pagination';

function Home() {
	const [refresh, setRefresh] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(5);
	
	const [selectedAlarm, setSelectedAlarm] = useState({
		id: "",
        product_name: "",
        probe_number: "",
        diff: "",
        tank_id: "",
        created: "",
		comment: ""
	})
	const [displayModal, setDisplayModal] = useState(true)
	const {data} = useFetchGet('GET', `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/get_pending_alarms/`, refresh, displayModal)
	const handleModal = (value) => setDisplayModal(value)
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const fillAlarmTable = () => {
		return (
			currentPosts.map((alarm, index) =>
				<tr className="bg-white border-b" key={index}>
					<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">{alarm.id}</th>
					<td className="py-4 px-6">{alarm.product_name}</td>
					<td className="py-4 px-6">{alarm.probe_number}</td>
					<td className="py-4 px-6">{alarm.diff} L</td>
					<td className="py-4 px-6">{alarm.created}</td>
					<td className="py-4 px-6">
						<button
							className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="button"
							onClick={() => {handleModal(false); setSelectedAlarm({...alarm, action: "update"})}}>Acknowledge
						</button>
						
					</td>
					<td>
						<div className="flex content-center">
							{
								alarm.acknowledged == 0
								? <span className="ml-5 text-red-500">Pending!</span>
								: <span className="ml-5 text-green-500">Ok</span>
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
					<div className="font-bold text-xl mb-20">Alarms

					</div>
					<div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
						<div className="flex justify-end mb-5">
							{/* <button
								className="shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
								type="button"
								onClick={() => {handleModal(false); setSelectedTank({number: "",product_name: "",probe_number: "",capacity: "",threshold: "", action: "create"})}}>+
							</button> */}
						</div>
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shrink mb-20">
							<thead className="text-xs text-white uppercase bg-gray-800 ">
								<tr>
									<th scope="col" className="py-3 px-6">ID</th>
									<th scope="col" className="py-3 px-6">Product</th>
									<th scope="col" className="py-3 px-6">Probe Number</th>
									<th scope="col" className="py-3 px-6">Diff</th>
									<th scope="col" className="py-3 px-6">DateTime</th>
									<th scope="col" className="py-3 px-6">Actions</th>
									<th scope="col" className="py-3 px-6">Status</th>
								</tr>
							</thead>
							<tbody>
								{
									data.length > 0
										? fillAlarmTable()
										:<tr><th>No alarms yet!</th></tr>
								}
							</tbody>
						</table>
					</div>
				</div>
				<div className='text-sm text-center text-gray-500 dark:text-gray-400 shrink mb-20'>Page: {currentPage}</div>
				<Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate} currentPage={currentPage}/>
				<AlarmModal handleModal={handleModal} displayModal={displayModal} selectedAlarm={selectedAlarm} setSelectedAlarm={setSelectedAlarm}/>
			</div>
			
		</>
	)
}

export default Home
