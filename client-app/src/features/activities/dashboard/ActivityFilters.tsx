import React, { Fragment, useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/RootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filtres"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"Toutes les activités"}
        />
        <Menu.Item
          active={predicate.has("isGping")}
          onClick={() => setPredicate("isGoing", "true")}
          color={"blue"}
          name={"username"}
          content={"Je participe"}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
          color={"blue"}
          name={"host"}
          content={"J'organise"}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Sélectionner une date"}
      />
      <Calendar
        onChange={(date) => setPredicate('startDate', date!)}
        value={predicate.get('startDate') || new Date()}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
