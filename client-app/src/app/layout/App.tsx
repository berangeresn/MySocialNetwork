import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from 'mobx-react-lite';
import ActivityStore from '../stores/ActivityStore';

const App = () => {

  // hook pour le state management by MobX
  const activityStore = useContext(ActivityStore);

  // UseEffect Hook est exécuté chaque fois que le component est rendu.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Chargement des activités...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
