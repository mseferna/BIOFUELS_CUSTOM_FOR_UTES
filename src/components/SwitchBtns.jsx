import React, {useState} from 'react'

function SwitchBtns({initialState, index, id, onChange}) {
   
    const [checked, setChecked] = useState(initialState);
  
    const onClick=(checked)=>{
     setChecked(checked);
    }


  return (
    <label className="inline-flex relative items-center cursor-pointer">
        <input id={`tank-checkbox-${index}`} type="checkbox" className="sr-only peer" checked={checked} onClick={e => onClick(e.target.checked)} onChange={()=> onChange(id, !checked)}/>
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-white dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
        </label>
  )
}

export default SwitchBtns