import { useParams ,useHistory } from 'react-router-dom';
import {DISPO} from "constants/routes";
import React from 'react';
import {PageDescription, FlashyButton} from 'littleComponents';
import {useAuthContext} from "components/AuthentificationJwt/context";


function MilestonePage() {  
  const authContext = useAuthContext();
  const history = useHistory();
  
  return (
      <div>
        <div className="paper">
          <h1>{ authContext.interviewType ?? "" }</h1>
          <h2>what is it ? </h2>
          <PageDescription>{ authContext.description ?? "" }</PageDescription>
          <FlashyButton onClick={() => history.push(DISPO)}>
            Take appointment
          </FlashyButton>
              <img src="/milestoneVector.svg" />
        </div>
      </div>

  );
}

export default MilestonePage;
