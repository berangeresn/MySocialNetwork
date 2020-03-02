import React, { useContext, useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/RootStore";
import ActivityFilters from "./ActivityFilters";

export const ActivityDashboard: React.FC = () => {
  // hook pour le state management by MobX
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial, setPage, page, totalPages} = rootStore.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  }

  // UseEffect Hook est exécuté chaque fois que le component est rendu.
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Chargement des activités..." />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
        <Button 
        floated='right'
        content='En voir plus...'
        positive
        disabled={totalPages === page + 1}
        onClick={handleGetNext}
        loading={loadingNext}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
