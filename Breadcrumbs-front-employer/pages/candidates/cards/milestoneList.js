import { useEffect, useState } from 'react';
import {useAuthContext} from "utils/context";
import Tooltip from "@material-ui/core/Tooltip";
import {ArrowLeftSquare, ArrowsUp, ChevronDown, Edit, SquareForbid} from "tabler-icons-react";
import Dialog from "components/Dialog";

export default function MilestoneList(props) {
    const milestonesList = props.milestonesList;

    const [dialogOpen, setOpen] = useState(false);

    let currentMilestone;

    function handleClose() {
        setOpen(false);
    }
    function getCurrent(current) {
        currentMilestone = current;
    }
    function isCurrent(milestone) {
        return (milestone?.status ==='IN_PROGRESS' || milestone.status==='ON_APPROVAL');
    }


    return (
        <div className="p-4">
            <h1 className="font-roboto text-2xl font-medium tracking-wide mb-5">Process status</h1>
            <>
                <Tooltip title={<span className="font-quicksand text-base" >Let him go to next step</span>} >
                    <button className="block rounded-md text-white bg-royalblue p-2 "
                            onClick={ (event) => setOpen(true) } >
                        Upgrade process
                        <ArrowsUp className="inline ml-4" />
                    </button>
                </Tooltip>

                <Tooltip title={<span className="font-quicksand text-base" >Mettre fin au process.<br/>Fonctionnalité non disponible</span>} >
                    <button className="block rounded-md text-white bg-red-700 p-2 mt-2" >
                        End process
                        <SquareForbid className="inline ml-4" />
                    </button>
                </Tooltip>

                <button className="block rounded-md text-white bg-gray-400 p-2 mt-2" title="Fonctionnalité non-disponible">
                    Change milestones
                    <Edit className="inline ml-4" />
                </button>
            </>
            <ul className="mt-4" >
                { milestonesList.map((milestone, i2) => (
                    < li key={i2} className="font-roboto text-xl text-royalblue p-2" title={milestone.status} >
                        { milestone?.milestone_name }
                        { isCurrent(milestone) && <ArrowLeftSquare size={30} className="ml-4 inline mb-1" /> }
                        { isCurrent(milestone) && getCurrent(milestone) }
                        <ChevronDown className="inline float-right"/>
                    </li>

                )) }
            </ul>

            <Dialog open={dialogOpen} onClose={handleClose} onConfirm={props.sendIncrement} >
                <p>Do you want to increment process from <strong className="tracking-wide" >{ currentMilestone?.milestone_name }</strong> to <strong>{ currentMilestone?.next?.milestone_name }</strong></p>
                <p>Confirm only if the appointment is over.</p>
            </Dialog>
        </div>
    )
}