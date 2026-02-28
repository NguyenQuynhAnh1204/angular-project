
export type TDisplay = 'left' | 'right' | 'center'
export type TSize = 'small' | 'medium' | 'large'

export interface ITabsProps {
    key: number;
    label?: string;
    children?: string;
    icon?: string;
}


export interface IIndicator {
    size?: 'half' | 'full';
    align?: TDisplay;
}