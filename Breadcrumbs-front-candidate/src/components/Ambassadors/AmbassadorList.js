import React from 'react';
import {TitleSource} from "../Navigation/titleContext";
import {AMBASSADORS_TITLE} from "../../constants/routes";
import {AMBASSADORS_DESCRIPTION} from "constants/description";
import {PageDescription} from '../Navigation';

import Avatar from '@material-ui/core/Avatar';
import Label from '@material-ui/icons/Label';
import "./ambassador.scss"
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const collaborators = [
    {
        name: "Elon",
        photo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Elon_Musk_and_Hans_Koenigsmann_at_the_SpaceX_CRS-8_post-launch_press_conference_%2826223624532%29_%28cropped%29.jpg",
        catch_phrase: "Strenght, Health and Futur",
        description: "Administration",
        mail: "iliesb.pro@gmail.com",
        pronom: "him"
    },
    {
        name: "Jack",
        photo: "https://s1.qwant.com/thumbr/0x380/8/c/0cd410d28660781ca6b2920f52a271d8c15617ea12a1ca0cfbf198b02fff8b/1200px-20th_Anniversary_Schwab_Foundation_Gala_Dinner_%2844887783681%29.jpg?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F1d%2F20th_Anniversary_Schwab_Foundation_Gala_Dinner_%252844887783681%2529.jpg%2F1200px-20th_Anniversary_Schwab_Foundation_Gala_Dinner_%252844887783681%2529.jpg&q=0&b=1&p=0&a=0",
        catch_phrase: "Smile and live !",
        description: "Human Ressource",
        mail: "iliesb.pro@gmail.com",
        pronom: "him"
    },
    {
        name: "Jason",
        photo: "https://www.gewoonvoorhem.nl/app/uploads/2020/01/Jason-Statham-Countdown-Rep-e1578660419114.jpg",
        catch_phrase: "Rule number 1 : No question",
        description: "Delivery service",
        mail: "iliesb.pro@gmail.com",
        pronom: "him"
    }
]

const AmbassadorItem = (props) => {

    return (
        <>
            <div className="avatar">
                <Avatar alt="Photo de profil" src={props.photo} className="photo"/>
                <div className="description">
                    <h3 className="title">{props.name}</h3>
                    <label>{props.description}</label>
                    <div className="catchPhrase">{props.catchPhrase}</div>
                    <a className='getTouch'
                       href={`mailto:${props.mail}?subject=Question sur Breadcrumbs&cc=partenaire@breadcrumbs.net&body=Bonjour,`}>
                        ___Get in touch with {props.pronom}
                    </a>
                </div>
            </div>
        </>
    )
}
const AmbassadorList = () => {

    return (
        <>
            <div className='searchForm'>
                <Box m={2}>
                    <input type='text' placeholder='Search by keyword'/>
                </Box>

                <Box m={2}>
                    <FormControl variant="outlined" style={{"minWidth": "100%"}}>
                        <InputLabel id="profile-type-label">Profile type</InputLabel>
                        <Select
                            labelId="profile-type-label"
                            id="profile-type"
                            label="profile"
                            variant="outlined"
                        >
                            <MenuItem value={"ALL"}>All</MenuItem>
                            <MenuItem value={"RH"}>Human resources</MenuItem>
                            <MenuItem value={"manager"}>Manager</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="ambassadors">
                {
                    collaborators.map((collaborator, index) =>
                        <AmbassadorItem key={index} name={collaborator.name}
                                        photo={collaborator.photo}
                                        catchPhrase={collaborator.catch_phrase}
                                        description={collaborator.description}
                                        mail={collaborator.mail}
                                        pronom={collaborator.pronom}/>
                    )
                }
            </div>
        </>
    )
}

export default AmbassadorList;