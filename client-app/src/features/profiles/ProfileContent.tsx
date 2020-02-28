import React from 'react';
import { Tab } from 'semantic-ui-react';
import { ProfilePhotos } from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';

const panes = [
    {menuItem: 'A propos', render: () => <ProfileDescription />},
    {menuItem: 'Photos', render: () => <ProfilePhotos />},
    {menuItem: 'Activités', render: () => <Tab.Pane>Activités content</Tab.Pane>},
    {menuItem: 'Abonnés', render: () => <Tab.Pane>Abonnés content</Tab.Pane>},
    {menuItem: 'Abonnements', render: () => <Tab.Pane>Abonnements content</Tab.Pane>}
]

export const ProfileContent = () => {
    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
}
