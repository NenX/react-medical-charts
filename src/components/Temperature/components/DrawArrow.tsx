import React, { FC } from "react";

export const DrawArrow: FC<{ x: number, y: number, length: number, isUp: boolean, color: string }> = ({ x, y, length, isUp, color }) => {
    let y1 = y - length;
    let y2 = y - 3;
    if (isUp) {
        y1 = y;
        y2 = y - length + 3;
    }
    return (
        <svg key={y + (isUp ? "up" : "down")}>
            <line x1={x} y1={y1} x2={x} y2={y2} style={{ stroke: color, strokeWidth: 1 }}
                markerEnd='url(#markerArrow)' />
            <defs>
                <marker id='markerArrow' markerWidth='8' markerHeight='8' refX='4' refY='4.5' orient='auto'>
                    <path d='M1.62,1.62 L1.62,7.92 L7.2,4.32 L1.62,1.62' style={{ fill: color }}
                    />
                </marker>
            </defs>
        </svg>
    );
}