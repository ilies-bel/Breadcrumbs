import { Fragment, useState } from "react";
import {ChevronDown } from "tabler-icons-react";


export default function SelectDropdown(props) {
    const optiondrop = props.children ;
    const currentColor = props.currentColor
    const onChange = props.onChange
    const defaultValue = props.defaultValue

    const [ open, setOpen ] = useState(false)
    const [ selected, setSelected ] = useState(optiondrop[0])
    const [ title, setTitle ] = useState(defaultValue)
    return (

<div className="flex-auto flex flex-col h-64" aria-label="select" onClick={() => {setOpen(prev => !prev)}} >
    <div className="flex flex-col  relative">
        <div className="w-full  ">
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded ">
                <div className="flex flex-auto flex-wrap"></div>
                <span placeholder="Colors" className="p-1 px-2 appearance-none outline-none w-full text-gray-800  " >
                    { title }
                </span>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 borderL flex items-center border-gray-200 ">
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                        <ChevronDown/>
                    </button>
                </div>
            </div>
        </div>
        <div className="relative shadow w-full lef-0 rounded max-h-select overflow-y-auto ">
            <div className="flex flex-col w-full max-h-32 " onClick={onchange} >
                { open && optiondrop  }
                            
            </div>
        </div>
    </div>
</div>
    )
}