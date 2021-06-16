import React from 'react';
import {createTeleporter} from 'react-teleporter'

const Title = createTeleporter()

export function TitleTarget() {
    return <Title.Target as="span" />
}
export function TitleSource({ children }) {
    return <Title.Source>{children}</Title.Source>
}
