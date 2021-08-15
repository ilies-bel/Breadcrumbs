import { useState } from "react"

export default function OptionDropdown(props) {
    const children = props.children

    const borderSelected = props.borderSelected ?? "royalblue"
    const [ leftBorder, setBorder ] = useState(borderSelected)

    return (
        <div className="cursor-pointer w-full border-gray-100 border-b 
            hover:bg-royalblue bottom-0 "
            aria-label="option"
            onClick={ props.onChange } >
            <div className={`flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-${leftBorder}-500 hover:text-white border-${leftBorder}-500`}>
                <div className="w-full items-center flex">
                    <div className="mx-2 leading-6  ">{ children} </div>
                </div>
            </div>
        </div>
    )
}