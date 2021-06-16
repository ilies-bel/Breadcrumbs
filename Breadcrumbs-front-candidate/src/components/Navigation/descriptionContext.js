import React from 'react';
import {createTeleporter} from 'react-teleporter'

const Title = createTeleporter()

export function TitleDescriptionTarget() {
    return <Title.Target as="span" />
}
export function TitleDescriptionSource({ children }) {
    return <Title.Source>{children}</Title.Source>
}
