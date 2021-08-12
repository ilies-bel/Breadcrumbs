import React, {useReducer, useState} from 'react';
import dynamic from 'next/dynamic';
import {HexColorPicker, HexColorInput} from "react-colorful";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { usePostTheme } from "utils/axios";

const Stage = dynamic(() => import('react-konva').then((module) => module.Stage), {ssr: false});
const Layer = dynamic(() => import('react-konva').then((module) => module.Layer), {ssr: false});
const Rect = dynamic(() => import('react-konva').then((module) => module.Rect), {ssr: false});
const Text = dynamic(() => import('react-konva').then((module) => module.Text), {ssr: false});
const Line = dynamic(() => import('react-konva').then((module) => module.Line), {ssr: false});

import {ArrowBackUp} from "tabler-icons-react";
import {drawerReducer} from "../../../utils/themeReducer";
import Dialog from "../../../components/Dialog";
import ColorPicker from './colorPicker';


export default function AppEditor(props) {
    const theme = props?.theme;

    const [stageSize] = useState({width: 375, height: 800});
    const [color, setColor] = useState("#aabbcc");
    const [fontColor, setFontColor] = useState("#aabbcc");
    const [selectedLayout, setSelected] = useState("")

    const [checked, setChecked] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [ pointer, setPointer] = useState(false);

    const [ openDialog, setDialog ] = React.useState(false)
    const [ cancelDialog, setCancelDialog ] = React.useState(false)

    const [ { loading }, execute ] = usePostTheme()

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
    const mouseEventsProps = (layout) => checked && {
        onMouseOver:  ()=> setPointer(true),
        onMouseLeave: () => setPointer(false),
        onClick: () => setSelected(layout)
    }

    const toggleChecked = async () => {
        await setToggling(true);
        setChecked((prev) => !prev);
        //setText("Here you can edit your availabilities.");
        setToggling(false);
    }

    function onConfirm(data) {
        execute({data: state}).then(res => console.log(res.data)).catch(e => console.error(e))
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
                    <Stage className={ pointer ? `cursor-pointer` : '' } width={stageSize.width} height={stageSize.height} drawBorder>
                        <Layer >
                            {/* TODO: former de meilleurs groupements par Layer */}
                            <Rect x={0} y={0} width={stageSize.width} height={stageSize.height} stroke="black"
                                  strokeWidth={4}/>

                            <Rect className="Header"  {...mouseEventsProps("header") }
                                  x={4} y={30} width={300} height={100} fill={ state.header.bgColor ?? "royalblue"}
                                  />
                            <Text {...mouseEventsProps} text="Welcome" x={30} y={50} fontFamily="Roboto" fontSize={50} fill={ state.header.fontColor ?? "white"}/>

                            <Rect className="MainBody"  {...mouseEventsProps("mainBody") }
                                  x={4} y={140} width={stageSize.width-8} height={550} fill={ state.mainBody.bgColor ?? "white"}
                                  />
                            <Text {...mouseEventsProps}
                                  text="some text" x={30} y={250}
                                  fontFamily="Roboto" fontSize={50}
                                  fill={ state.mainBody.fontColor ?? "black"}/>
                        
                        </Layer>

                            <Layer x={2} y={stageSize.height-100}>
                            <Line points={[ 4, 0, stageSize.width-4, 0 ]} stroke={ state.sidebar.bgColor ?? 'red'}/>
                            
                            <Rect x={35} y={25} width={15} height={30} fill="white"
                                  stroke={ state.sidebar.fontColor ?? "black"} strokeWidth={2}
                                  { ...mouseEventsProps("sidebar")}/>
                            <Line points={ [35, 30, 47, 38, 59, 45, 60, 50]} stroke={ state.sidebar.fontColor ?? "black"} strokeWidth={2} />
                                  
                            <Text {...mouseEventsProps("sidebar") }                 
                                  text="Application" x={20} y={70} width={100}
                                  fontFamily="Roboto" fontSize={15}
                                  fill={ state.sidebar.fontColor ?? "black"}/>
                            <Line points={[ 110, 5, 110, 90 ]} stroke={ state.sidebar.bgColor ?? 'red'}/>
                            </Layer>


                        
                    </Stage>
                </div>

                { (checked && selectedLayout) &&
                <ColorPicker theme={theme} selectedLayout={selectedLayout} dispatch={dispatch} />
                }

                <Dialog title="Changement de thème" open={openDialog} onClose={() => setDialog(false)} 
                onConfirm={onConfirm} >
                    Enregistrer le thème pour le candidat.
                    Fonctionnalité non-disponible.
                </Dialog>
            </div>
        </>
    )
}