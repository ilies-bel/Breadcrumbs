import React, {Component} from 'react';

import {withFirebase} from '../Firebase';
import {Box, FormControlLabel, Switch, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FlashyButton from "../littleComponents/flashyButton";
import "./accountPage.scss"
import {TitleSource} from "Navigation/titleContext";
import {AMBASSADORS_TITLE} from "constants/routes";

const user_info =
    {
        photo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Elon_Musk_and_Hans_Koenigsmann_at_the_SpaceX_CRS-8_post-launch_press_conference_%2826223624532%29_%28cropped%29.jpg",
        first_name: "Brandon",
        last_name: "Bannon",
        email: "iliesb.pro@gmail.com",
        notification_email: true,
        notification_push: false
    }

const onSendPasswordResetEmail = () => {
    console.log("Password reset")
};


const AccountPage = props => {

    const [user, setUser] = React.useState({
        user_info
    });


    return (

        <div>
            <TitleSource>My account</TitleSource>



            <div>
                <h2 className={"main_title"}>
                    Personal information
                </h2>
                <form>
                    <TextField

                        id="first_name"
                        name="first_name"
                        label="FIRST NAME"
                        defaultValue={user_info.first_name}
                        fullWidth
                        margin="normal"


                    />

                    <TextField
                        id="last_name"
                        name="last_name"
                        label="LAST NAME"
                        defaultValue={user_info.last_name}
                        fullWidth
                        margin="normal"
                    />


                    <TextField
                        id="email"
                        name="email"
                        label="EMAIL ADDRESS"
                        defaultValue={user_info.email}
                        fullWidth
                        margin="normal"
                    />

                    <h2 className={"main_title"}>
                        Password
                    </h2>

                    <Button
                        variant="contained"
                        onClick={onSendPasswordResetEmail}>
                        Send Password Reset
                    </Button>

                    <div>
                        <h3 className={"notification_title"}>
                            MAIL NOTIFICATIONS
                        </h3>

                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    checked={user.notification_email}
                                    color="primary"
                                    name="notification_email"
                                    inputProps={{'aria-label': 'mail checkbox'}}/>
                            }
                            label="Allow Breadcrumbs to send mail
                            notifications"
                            labelPlacement="start"
                        />

                    </div>

                    <div>
                        <h3 className={"notification_title"}>
                            PUSH NOTIFICATIONS
                        </h3>

                        <FormControlLabel
                            value="start"
                            control={
                                <Switch
                                    checked={user.notification_push}

                                    color="primary"
                                    name="notification_push"
                                    inputProps={{'aria-label': 'primary checkbox'}}/>
                            }
                            label="Allow Breadcrumbs to send push
                            notifications"
                            labelPlacement="start"
                        />

                    </div>

                    <Box m={2}>
                        <FlashyButton>
                            SAVE CHANGES
                        </FlashyButton>
                    </Box>


                </form>


                <span>





            </span>
            </div>


        </div>


    )
}

export default AccountPage;
