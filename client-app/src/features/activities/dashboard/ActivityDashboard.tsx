import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/ActivityStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

export const ActivityDashboard: React.FC = () => {
  // hook pour le state management by MobX
  const activityStore = useContext(ActivityStore);

  // UseEffect Hook est exécuté chaque fois que le component est rendu.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Chargement des activités..." />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
