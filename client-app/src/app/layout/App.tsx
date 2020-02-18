import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  // UseState Hook (c'est un array): [state, setState] + ne pas oublier le type du State
  const [activities, setActivities] = useState<IActivity[]>([]);

  // UseEffect Hook est exécuté chaque fois que le component est rendu. Ne pas oublier de rajouter un empty array en 2e paramètre :
  // cela permet de run le component une seule et unique fois. Sinon boucle infinie.
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </Fragment>
  );
};

export default App;
