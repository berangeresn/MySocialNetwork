import React from 'react'
import { Segment, Form } from 'semantic-ui-react'

export const ActivityForm = () => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder='Titre' />
                <Form.TextArea rows={3} placeholder='Description' />
                <Form.Input placeholder='Catégorie' />
                <Form.Input type='date' placeholder='Date' />
                <Form.Input placeholder='Ville' />
                <Form.Input placeholder='Destination' />
            </Form>
            </Segment>
    )
}
