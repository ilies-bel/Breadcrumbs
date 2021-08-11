import React from 'react';
import dynamic from 'next/dynamic';

const StageNoSSR = dynamic(() => import('react-konva').then((module) => module.Stage ), {ssr: false} );
const LayerNoSSR = dynamic(() => import('react-konva').then((module) => module.Layer ), {ssr: false} );
const RectNoSSR = dynamic(() => import('react-konva').then((module) => module.Rect ), {ssr: false} );
const TextNoSSR = dynamic(() => import('react-konva').then((module) => module.Text ), {ssr: false} );

export default function RectNN() {
    const theme= {}
    return (
        <StageNoSSR width={200} height={200}>
            <LayerNoSSR>
            <RectNoSSR x={20} y={50} width={100} height={20} fill={theme?.data?.bgColor ?? "red"} />
            </LayerNoSSR>
        </StageNoSSR>

    )
}