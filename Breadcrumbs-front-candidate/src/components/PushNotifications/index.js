import React from 'react';
import usePushNotifications from 'utils/usePushNotification.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import { PageDescription } from '../Navigation';

const PushNotification = () => {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading
  } = usePushNotifications();


  if (error) {
    return  (
      <section className="app-error">
        <h2>{error?.name}</h2>
        <p>Error message : {error?.message}</p>
        <p>Error code : {error?.code}</p>
      </section>)
  }
  if (loading) {
    return <CircularProgress />
  }

  return (
    <div>
      { pushNotificationSupported && <PageDescription>Push notification not supported</PageDescription>}
      <PageDescription>Consent : { userConsent ?? "dlldldld" }</PageDescription>

      <button onClick={onClickAskUserPermission ?? "dlldldld" }>Ask user permission</button>

      <button onClick={onClickSusbribeToPushNotification ?? "dlldldld" }>Create Notification subscription</button>
      <button onClick={onClickSendSubscriptionToPushServer ?? "dlldldld" }>Send subscription to push server</button>
      <button onClick={onClickSendNotification ?? "dlldldld" }>Send a notification</button>

    </div>
  )
}

export default PushNotification