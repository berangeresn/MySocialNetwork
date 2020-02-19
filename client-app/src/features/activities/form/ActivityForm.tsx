import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from '../../../app/stores/ActivityStore';

interface IProps {
  activity: IActivity;
}

export const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore;
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

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  // prend en compte ce qui est écrit par l'user
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Titre"
          value={activity.title}
        />
        <Form.TextArea
          rows={3}
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Catégorie"
          value={activity.category}
        />
        <Form.Input
          type="datetime-local"
          onChange={handleInputChange}
          name="date"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          placeholder="Ville"
          onChange={handleInputChange}
          name="city"
          value={activity.city}
        />
        <Form.Input
          placeholder="Destination"
          onChange={handleInputChange}
          name="venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Publier"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Annuler"
        />
      </Form>
    </Segment>
  );
};
