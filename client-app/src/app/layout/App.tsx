import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";

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
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Flutter Activities</Header.Content>
      </Header>
      <List>
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
