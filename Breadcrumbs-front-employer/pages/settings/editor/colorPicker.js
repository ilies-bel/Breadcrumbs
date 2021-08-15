import React, {useState} from 'react';
import {HexColorInput, HexColorPicker} from "react-colorful";
import { colorsMap } from './editor/initialColorPickerState';

import SelectDropdown from 'components/Formulaire/Select'
import OptionDropdown from 'components/Formulaire/Select/Option'
import { SquaresFilled } from 'tabler-icons-react';

export default function ColorPicker(props) {
    const selectedLayout = props?.selectedLayout;
    const theme = props?.theme;
    const dispatch = props?.dispatch

    const [color, setColor] = useState(props?.initialBgColor);
    const [fontColor, setFontColor] = useState(props?.initialFontColor);


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
                <select defaultValue={color} onChange={(e) => {
                                const newColor = e.target.value
                                console.log(newColor)
                                setColor(colorsMap.find(o => o.name===newColor).value);
                                dispatch({ type: selectedLayout , payload: { bgColor: newColor } })
                        }}
                    >
                    {
                        colorsMap.map((c, i) =>
                        <option key={i} >{c.name}</option>
                        )
                    }
                    
                </select>
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

                <SelectDropdown onChange={(e) => console.log(e.target.value) } currentColor={color}
                                defaultValue="Colors" >
                {
                        colorsMap.map((c, i) =>
                        <OptionDropdown borderSelected={c.name} key={i}
                            onChange={(e) => {
                                    const newColor = c.value
                                    setFontColor(newColor);
                                    dispatch({ type: selectedLayout , payload: { fontColor: newColor } })
                                    }}
                        >
                           <SquaresFilled color={c.name} className="inline" /> {c.name}
                        </OptionDropdown>
                        )
                    }
                </SelectDropdown>
            </div>
        </div>
    )
}