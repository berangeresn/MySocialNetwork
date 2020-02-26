import React from "react";
import {
  Item,
  Button,
  SegmentGroup,
  Segment,
  Icon,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host?.image || "/assets/user.png"}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Organisé par {host?.displayName}
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="Vous êtes l'organisateur de cette activité"
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="Vous participez à cette activité"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(activity.date, "h:mm")}
        <Icon name="marker" />
        {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="Voir"
          color="blue"
        />
      </Segment>
    </SegmentGroup>
  );
};

export default observer(ActivityListItem);
