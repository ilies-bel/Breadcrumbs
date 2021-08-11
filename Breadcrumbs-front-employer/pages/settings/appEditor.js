import React, {useReducer, useState} from 'react';
import dynamic from 'next/dynamic';
import {HexColorPicker, HexColorInput} from "react-colorful";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {fetchCalendarData} from "../../utils/axios";

const Stage = dynamic(() => import('react-konva').then((module) => module.Stage), {ssr: false});
const Layer = dynamic(() => import('react-konva').then((module) => module.Layer), {ssr: false});
const Rect = dynamic(() => import('react-konva').then((module) => module.Rect), {ssr: false});
const Text = dynamic(() => import('react-konva').then((module) => module.Text), {ssr: false});
const Line = dynamic(() => import('react-konva').then((module) => module.Line), {ssr: false});

import {ArrowBackUp} from "tabler-icons-react";
import {drawerReducer} from "../../utils/themeReducer";
import Dialog from "../../components/Dialog";


export default function AppEditor(props) {
    const theme = props?.theme;

    const [stageWidth] = useState({width: 375, height: 800});
    const [color, setColor] = useState("#aabbcc");
    const [fontColor, setFontColor] = useState("#aabbcc");
    const [selectedLayout, setSelected] = useState("")

    const [checked, setChecked] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [ pointer, setPointer] = useState(false);

    const [ openDialog, setDialog ] = React.useState(false)
    const [ cancelDialog, setCancelDialog ] = React.useState(false)

    const colorPickerState = {
        header: {
            bgColor: "royalblue", fontColor: false
        },
        sidebar: {
            bgColor: "red", fontColor: false
        },
        mainBody: {
            bgColor: "white", fontColor: false
        }
    }
    const [state, dispatch ] = drawerReducer(colorPickerState);


    //Si le switch est activé, on active les événements passés en props
    let mouseEventsProps = checked && {
        onMouseOver:  ()=> setPointer(true),
        onMouseLeave: () => setPointer(false)
    }

    const toggleChecked = async () => {
        await setToggling(true);
        setChecked((prev) => !prev);
        //setText("Here you can edit your availabilities.");
        setToggling(false);
    }

    return (
        <>
            <FormControlLabel
                control={<Switch size="small" checked={checked} onChange={toggleChecked}/>}
                label={!checked ? 'Locked' : 'Editing'}
            />
            { checked &&
            <button
                className={`rounded-md shadow text-white bg-royalblue p-2 ml-20`}
                title="Fontionnalité non-disponible"
                onClick={() => setDialog(true)}
                >
                Save changes
            </button>
            }

            { checked &&
                <div>
                    <button className="hover:bg-blue-100 focus:bg-blue-100 p-2 rounded-3xl" title="undo" > <ArrowBackUp size={30} /> </button>
                </div>
            }
            {checked && <p className="font-roboto font-medium text-2xl"> {selectedLayout}</p>}
            <div className="flex justify-between w-1/2">
                <div className="inline">
                    <Stage className={ pointer ? `cursor-pointer` : '' } width={stageWidth.width} height={stageWidth.height} drawBorder>
                        <Layer>
                            <Rect x={0} y={0} width={stageWidth.width} height={stageWidth.height} stroke="black"
                                  strokeWidth={4}/>

                            <Rect className="Header"  {...mouseEventsProps}
                                  x={4} y={30} width={300} height={100} fill={ state.header.bgColor ?? "royalblue"}
                                  onClick={() => setSelected("header") }/>
                            <Text {...mouseEventsProps} text="Welcome" x={30} y={50} fontFamily="Roboto" fontSize={50} fill={ state.header.fontColor ?? "white"}/>

                            <Rect className="MainBody"  {...mouseEventsProps}
                                  x={4} y={140} width={stageWidth.width-8} height={550} fill={ state.mainBody.bgColor ?? "white"}
                                  onClick={() => setSelected("mainBody") }/>
                            <Text {...mouseEventsProps}
                                  text="some text" x={30} y={250}
                                  fontFamily="Roboto" fontSize={50}
                                  fill={ state.mainBody.fontColor ?? "black"}/>

                            <Line points={[ 4, 700, stageWidth.width-4, 700 ]} stroke={ state.sidebar.bgColor ?? 'red'}/>
                            <Text {...mouseEventsProps}
                                  onClick={() => setSelected("sidebar") }
                                  text="Hiring process" x={20} y={730} width={100}
                                  fontFamily="Roboto" fontSize={20}
                                  fill={ state.sidebar.fontColor ?? "black"}/>
                            <Line points={[ 110, 705, 110, 790 ]} stroke={ state.sidebar.bgColor ?? 'red'}/>


                        </Layer>
                    </Stage>
                </div>

                { (checked && selectedLayout) &&
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
                }

                <Dialog title="Changement de thème" open={openDialog} onClose={() => setDialog(false)} >
                    Enregistrer le thème pour le candidat.
                    Fonctionnalité non-disponible.
                </Dialog>
            </div>
        </>
    )
}