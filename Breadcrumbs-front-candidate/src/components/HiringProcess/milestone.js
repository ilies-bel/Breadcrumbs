import { useParams, useRouteMatch,useHistory } from 'react-router-dom';
import { TitleDescriptionSource } from '../Navigation/descriptionContext';
import {HIRING_DESCRIPTION} from "../../constants/description";
import {DISPO} from "../../constants/routes";

import React from 'react';

import {PageDescription, FlashyButton} from 'littleComponents';
import {useGetProcess, useInterviewType} from '../../utils/axios';
import {AuthUserContext} from "../AuthentificationFirebase/Session";
import {useAuthContext} from "components/AuthentificationJwt/context";
import CircularProgress from "@material-ui/core/CircularProgress";

function MilestonePage() {
  const { id } = useParams();
  const { path, url } = useRouteMatch();
  
  const authContext = useAuthContext();
  const history = useHistory();
  const url2 = url.match(/[^/]\w+/g); //url2 permet n'a pas le caractère '/' 
  let description = HIRING_DESCRIPTION[url2];
  
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
