import React, { useContext, useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/RootStore";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";

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
    
  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page === 0 ? (
        <ActivityListItemPlaceholder />
        ) : (
          <InfiniteScroll 
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
          >
          <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
