import React from 'react';
import {TitleSource} from 'Navigation/titleContext'
import {TitleDescriptionSource} from 'Navigation/descriptionContext';
import {TIPS_TITLE} from "constants/routes";
import {TIPS_DESCRIPTION} from "constants/description"

import {makeStyles} from '@material-ui/core/styles';
const Accordion = React.lazy(() => import('@material-ui/core/Accordion'));
const AccordionDetails = React.lazy(() => import('@material-ui/core/AccordionDetails'));
const AccordionSummary = React.lazy(() => import("@material-ui/core/AccordionSummary"));
import CircularProgress from '@material-ui/core/CircularProgress';
const ExpandMore = React.lazy(() => import('@material-ui/icons/ExpandMore'));

import {useGetTips} from 'utils/axios';

import {PageDescription} from "../Navigation";
const Grid = React.lazy(() => import("@material-ui/core/Grid"));



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

    const classes = useStyles();

    if (loading) return <CircularProgress/>
    if (error) return (<div><strong>Error. No data found</strong></div>)

    return (
        <>
            <TitleSource>{TIPS_TITLE}</TitleSource>
            <PageDescription>
                {TIPS_DESCRIPTION}
            </PageDescription>
            <React.Suspense fallback={<CircularProgress/> } >
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
            </React.Suspense>
        </>

    );
}

export default Tips;
