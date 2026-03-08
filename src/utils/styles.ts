import type { CSSProperties } from "react";

export const getFocusRingStyle = (color: string): React.CSSProperties => ({
    '--tw-ring-color': color,
    outlineColor: color,
} as React.CSSProperties);

export const getInputStyles = (color: string, hasError?: boolean): CSSProperties => ({
    borderColor: hasError ? '#ef4444' : `${color}40`,
    ...getFocusRingStyle(color),
} as CSSProperties);