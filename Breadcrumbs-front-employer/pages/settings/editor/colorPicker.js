import React, {useState} from 'react';
import {HexColorInput, HexColorPicker} from "react-colorful";

export default function ColorPicker(props) {
    const selectedLayout = props?.selectedLayout;
    const theme = props?.theme;
    const dispatch = props?.dispatch

    const [color, setColor] = useState("#aabbcc");
    const [fontColor, setFontColor] = useState("#aabbcc");


    return (
        <div className="block">
            <div className="block p-4">
                <p className="bg-gray-300 rounded-md text-gray-700" > {selectedLayout} </p>
                <HexColorPicker color={color} onChange={(newColor) => {
                    setColor(newColor);
                    dispatch({ type: selectedLayout , payload: { bgColor: newColor } })
                }  }
                />
                <HexColorInput color={color}
                               onChange={(newColor) => {
                                   setColor(newColor);
                                   dispatch({ type: selectedLayout , payload: { bgColor: newColor } })
                               }  }
                               className="focus:ring-royalblue focus:border-royalblue w-32 border-2 border-gray-300 rounded-md text-2xl text-center font-roboto"
                               prefixed/>
            </div>
            <div className="font-color block p-4">
                <p className="bg-gray-300 rounded-md text-gray-700" >Font color of {selectedLayout} </p>
                <HexColorPicker color={fontColor} onChange={(newColor) => {
                    setFontColor(newColor);
                    dispatch({ type: selectedLayout , payload: { fontColor: newColor } })
                }  }
                />
                <HexColorInput color={fontColor} onChange={(newColor) => {
                    setFontColor(newColor);
                    dispatch({ type: selectedLayout , payload: { fontColor: newColor } })
                }  }
                               className="focus:ring-royalblue focus:border-royalblue w-32 border-2 border-gray-300 rounded-md text-2xl text-center font-roboto"
                               prefixed/>
            </div>
        </div>
    )
}