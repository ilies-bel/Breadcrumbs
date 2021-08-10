import { useEffect, useState } from 'react';
import {useAuthContext} from "utils/context";
import IconButton from "@material-ui/core/IconButton";
import { getMilestoneOfUser, useIncrementProcess } from "utils/axios";
import Popover from '@material-ui/core/Popover';
import {ListNumbers, CircleX, CirclePlus} from "tabler-icons-react";

import MilestoneList from "./cards/milestoneList";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "components/Dialog";


export default function MilestoneButton(props) {
    const [ currentMilestone, setCurrent] = useState();
    const [ milestonesList, setList ] = useState();
    const context = useAuthContext();

    const [ open, setOpen ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [{ loading }, execute ] = useIncrementProcess(props?.user)

    async function sendIncrement() {
        await execute({ data: props?.user }).then(res => setList(res.data)).catch(e => console.error(e));
        setAnchorEl(null)
        handleClose();
    }

    useEffect(() => {
        getMilestoneOfUser(props?.user, context.token).then(res => setList(res.data)).catch(e => console.error("request milestone failed in milestoneButton.js"))
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    if(loading) return <CircularProgress/>
    return (
        <>
            {
                milestonesList?.length>0 ? milestonesList.map((milestone, i) => (
                    (milestone?.status === 'IN_PROGRESS' || milestone?.status === 'ON_APPROVAL') && <span key={i}>
                        <button onClick={handleClick} className="inline text-lg text-royalblue tracking-wide rounded-md shadow p-2" >
                            {milestone?.milestone_name} <ListNumbers className="inline ml-4" />
                        </button>
                        <Popover open={open}
                                 anchorEl={anchorEl}
                                 onClose={handleClose}
                                 anchorOrigin={{
                                     vertical: 'top',
                                     horizontal: 'left',
                                 }}
                                 className="overflow-y-scroll"
                        >
                            <IconButton title="next" onClick={handleClose} ><CircleX /></IconButton>
                            <MilestoneList milestonesList={milestonesList} user={props.user} sendIncrement={sendIncrement} handleClose={handleClose} />
                        </Popover>
                    </span>
                ))
                    :
                    ( <button className="font-light rounded-md shadow p-2">Create <CirclePlus className="inline" /> </button> )
            }
        </>
    )
}
