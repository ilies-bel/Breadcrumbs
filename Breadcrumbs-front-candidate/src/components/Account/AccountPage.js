import React, { lazy, useState, useEffect, Suspense } from 'react';

const Box = lazy(() => import("@material-ui/core/Box"));
const FormControlLabel = lazy(() => import("@material-ui/core/FormControlLabel"));
const Switch = lazy(() => import("@material-ui/core/Switch"));
const TextField = lazy(() => import("@material-ui/core/TextField"));
const Button = lazy(() => import("@material-ui/core/Button"));

import CircularProgress from "@material-ui/core/CircularProgress";
import FlashyButton from "littleComponents/flashyButton";
import "./accountPage.scss"
import {TitleSource} from "Navigation/titleContext";
import {AMBASSADORS_TITLE} from "constants/routes";

import usePushNotifications from 'utils/usePushNotification.js';
import { useAuthContext } from 'utils/context';
import { usePostTheme } from 'utils/eventSource';

const useUser_info = () =>
    {
        const {
            userSubscription,
          } = usePushNotifications();
          const context = useAuthContext();

          
        const [photo, setPhoto]= useState("https://upload.wikimedia.org/wikipedia/commons/0/04/Elon_Musk_and_Hans_Koenigsmann_at_the_SpaceX_CRS-8_post-launch_press_conference_%2826223624532%29_%28cropped%29.jpg")
        const [first_name, setName]= useState(context.userFirstName)
        const [last_name]= useState(context?.userLastName)
        const [email]= useState("iliesb.pro@gmail.com")
        const [notification_email, setNotifEmail]= useState(true)
        const [notification_push, setPush]= useState(userSubscription!=null);

        return {photo, setPhoto, first_name, setName, last_name, email, notification_push, setPush, notification_email, setNotifEmail}
    }

const onSendPasswordResetEmail = () => {
    console.log("Password reset")
};


const AccountPage = props => {
    const {
        userConsent,
        onClickAskUserPermission,
        onClickSusbribeToPushNotification,

        userSubscription,
        ClickToUnsubscribe,
        error,
        loading
      } = usePushNotifications();

      
    const {data: dataTheme, error: errorTheme } = usePostTheme();

    const {first_name, last_name, setName, notification_push, setPush, notification_email} = useUser_info();
    useEffect(() => {
        setPush(userSubscription!=null);
    }, [userSubscription])

    async function togglePushNotification() {
        onClickAskUserPermission();

        !userSubscription ? await onClickSusbribeToPushNotification() : ClickToUnsubscribe();
        console.log("user dbsbsbns");console.log(userSubscription); console.log("/user dbsbsbns");
    }

    return (

        <div>
            
            <TitleSource>My account</TitleSource>
            <div>
                <h2 className={"main_title"}>
                    Personal information
                </h2>

                <form>
                    <Suspense fallback={<CircularProgress />}>
                    <TextField

                        id="first_name"
                        name="first_name"
                        label="FIRST NAME"
                        defaultValue={first_name}
                        fullWidth
                        margin="normal"

                    />

                    <TextField
                        id="last_name"
                        name="last_name"
                        label="LAST NAME"
                        defaultValue={last_name}
                        fullWidth
                        margin="normal"
                    />


                    <TextField
                        id="email"
                        name="email"
                        label="EMAIL ADDRESS"
                        defaultValue={"DEFAULT"}
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
                                    checked={notification_email}
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

                        {<FormControlLabel
                            value="start"
                            control={   
                                <Switch
                                    checked={notification_push}
                                    onChange={togglePushNotification}
                                    color="primary"
                                    name="notification_push"
                                    inputProps={{'aria-label': 'primary checkbox'}}/>
                                }
                            label={userConsent ==='denied' ? `You previously deny Push Notification.
                                                            You must change notification parameter of your browser to activate push notification.`
                                                          : `Allow Breadcrumbs to send push notifications`
                                                        }
                            labelPlacement="start"
                        />}

                    </div>

                    <Box m={2}>
                        <FlashyButton>
                            SAVE CHANGES
                        </FlashyButton>
                    </Box>

                    </Suspense>

                </form>

                <span>

            </span>
            </div>
            
        </div>


    )
}

export default AccountPage;
