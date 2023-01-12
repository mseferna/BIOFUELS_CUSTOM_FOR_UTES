import {useEffect, useState} from 'react'

export default function useFetchGet(method, url, refresh, displayModal){
    const [data, setData] = useState('')
    useEffect(() => {
		fetch(url, {method, headers: { 'Content-Type': 'application/json' }})
			.then(res => res.json())
			.then(json => { setData(json)})

	}, [url, refresh, displayModal, data.length])
    return {
        data
    }
}

