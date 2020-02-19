import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from '../../app/stores/ActivityStore';
import { observer } from "mobx-react-lite";


export const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Loisirs & Activités
        </Menu.Item>
        <Menu.Item name="Activités" />
        <Menu.Item>
          <Button onClick={activityStore.openCreateForm} positive content="Créer une activité" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
