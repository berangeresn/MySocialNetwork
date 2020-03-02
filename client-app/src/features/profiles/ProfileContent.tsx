import React from "react";
import { Tab } from "semantic-ui-react";
import { ProfilePhotos } from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";
import { observer } from "mobx-react-lite";

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const panes = [
  { menuItem: "A propos", render: () => <ProfileDescription /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Activités",
    render: () => <Tab.Pane>Activités content</Tab.Pane>
  },
  { menuItem: "Abonnés", render: () => <ProfileFollowings /> },
  { menuItem: "Abonnements", render: () => <ProfileFollowings /> }
];

export const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ProfileContent);
