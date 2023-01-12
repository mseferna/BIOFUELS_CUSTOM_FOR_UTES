import React from 'react'

function TankModal({ onSubmit, handleModal, displayModal, selectedTank, setSelectedTank}) {
   
    function onSubmit(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : 
                JSON.stringify(selectedTank)
        }
        console.log(selectedTank)
        fetch(`http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}/${selectedTank.action}_tank/`, requestOptions)
            .then(res => res.json())
            .then(() => handleModal(true))
        //window.location.reload()
    }

    const handleChange = (e) =>{
        const { name, value } = e.target
        setSelectedTank((prevState)=> ({...prevState, [name]: value}))
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Tank Definition</h3>
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="tank_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number</label>
                                <input
                                    type="number"
                                    name="number"
                                    id="tank_number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                    value={selectedTank && selectedTank.number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                                <input
                                    value={selectedTank && selectedTank.product_name}
                                    onChange={handleChange}
                                    type="text"
                                    name="product_name"
                                    id="product_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="probe_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Probe Number</label>
                                <input
                                    
                                    value={selectedTank && selectedTank.probe_number}
                                    onChange={handleChange}
                                    type="number"
                                    name="probe_number"
                                    id="probe_number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Capacity</label>
                                <input
                                    
                                    value={selectedTank && selectedTank.capacity}
                                    onChange={handleChange}
                                    type="number"
                                    name="capacity"
                                    id="capacity"
                                    placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="threshold" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Threshold</label>
                                <input
                                    onChange={handleChange}
                                    value={selectedTank && selectedTank.threshold}
                                    type="text"
                                    name="threshold"
                                    id="variance"
                                    placeholder=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full shadow bg-sky-600 hover:bg-sky-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TankModal