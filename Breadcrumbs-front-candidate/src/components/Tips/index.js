import React, { useContext } from 'react';
import {TitleSource} from 'Navigation/titleContext'
import {TitleDescriptionSource} from 'Navigation/descriptionContext';
import {TIPS_TITLE} from "constants/routes";
import {TIPS_DESCRIPTION} from "constants/description"

import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {useGetTips} from 'utils/axios';

import {PageDescription} from "../Navigation";
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
    text: {
        fontFamily: 'Roboto',
        margin: 0
    },
    num: {
        width: '9px',
        height: '12px',
        borderRadius: '100px',
        backgroundColor: '#D7E3FC',
        textAlign: 'center',
        paddingRight: '10px',
        paddingTop: '7px',
        paddingLeft: '11px',
        paddingBottom: '11px',
        fontSize: '16px',
        marginLeft: '-7px',
        color: '#3572F1',
        fontFamily: 'Quicksand',
    },
    nested: {
        paddingLeft: theme.spacing(10),
    },
    BottomBorder: {
        width: "100%",
        height: "1px",
        backgroundColor: '#D7E3FC',
    }
}))

const Tips = () => {
    const [{data, loading, error}, refetch] = useGetTips();
    const [open, setOpen] = React.useState(true);

    const classes = useStyles();

    if (loading) return <CircularProgress/>
    if (error) return (<div>
        <strong>Error. No data found</strong>
        <PushNotification></PushNotification>
        </div>)

    return (
        <>
            <TitleSource>{TIPS_TITLE}</TitleSource>
            <PageDescription>
                {TIPS_DESCRIPTION}
            </PageDescription>

            {
                data.map((tips, index) =>
                    <Accordion key={index}>
                        <AccordionSummary>

                            <Grid container>
                                <Grid item xs={2}>
                                    <div className={classes.num}>{index + 1}</div>
                                </Grid>

                                <Grid item xs={8}>
                                    <p className={classes.text}>{tips.title}</p>

                                </Grid>

                                <Grid item xs={2}>
                                    <ExpandMore/>
                                </Grid>
                            </Grid>

                        </AccordionSummary>

                        <AccordionDetails>
                            <div>
                                {tips.description}
                            </div>

                        </AccordionDetails>
                    </Accordion>
                )
            }
        </>

    );
}

export default Tips;
