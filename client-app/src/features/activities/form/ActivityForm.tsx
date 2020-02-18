import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: any) => {
    console.log(event.target.value);
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Titre"
          value={activity.title}
        />
        <Form.TextArea
          rows={3}
          name="description"
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          placeholder="Catégorie"
          value={activity.category}
        />
        <Form.Input
          type="date"
          name="date"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input placeholder="Ville" name="city" value={activity.city} />
        <Form.Input
          placeholder="Destination"
          name="venue"
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Publier" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Annuler"
        />
      </Form>
    </Segment>
  );
};
