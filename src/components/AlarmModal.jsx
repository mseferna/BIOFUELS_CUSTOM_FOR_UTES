import React from 'react'

function AlarmModal({ onSubmit, handleModal, displayModal, selectedAlarm, setSelectedAlarm}) {
   
    function onSubmit(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : 
                JSON.stringify(selectedAlarm)
        }
       
        fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/${selectedAlarm.action}_alarm/`, requestOptions)
            .then(res => res.json())
            .then(() => handleModal(true))
            .then(()=> setSelectedAlarm({...selectedAlarm, comment: ""}))
        //window.location.reload()
    }
    console.log(selectedAlarm)
    const handleChange = (e) =>{
        const { name, value } = e.target
        setSelectedAlarm((prevState)=> ({...prevState, [name]: value}))
        //console.log("lala", selectedTank)
    }
    //console.log(`http://localhost:8000/${selectedTank.action}_tank/`)
    return (
        <div className="flex justify-center shrink"> 
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" hidden={displayModal} className="absolute w-96 top-20">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={() => handleModal(true)}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        X
                    </button>

                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ack Alarm</h3>
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="probe_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Probe Number</label>
                                <input
                                    type="number"
                                    name="probe_number"
                                    id="probe_number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    onChange={()=> handleChange}
                                    value={selectedAlarm?.probe_number}
                                    disabled={true}
                               
                                
                                />
                        
                            </div>
                            <div>
                                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                                <input
                                    value={selectedAlarm?.product_name}
                                    onChange={()=> handleChange}
                                    type="text"
                                    name="product_name"
                                    id="product_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                   
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label htmlFor="diff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Diff</label>
                                <input
                                    
                                    value={selectedAlarm?.diff}
                                    onChange={()=> handleChange}
                                    type="number"
                                    name="diff"
                                    id="diff"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                             
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label htmlFor="created" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Timestamp</label>
                                <input
                                    
                                    value={selectedAlarm?.created}
                                    onChange={()=> handleChange}
                                    type="text"
                                    name="created"
                                    id="created"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</label>
                                <textarea
                                    onChange={handleChange}
                                    value={selectedAlarm?.comment}
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AlarmModal