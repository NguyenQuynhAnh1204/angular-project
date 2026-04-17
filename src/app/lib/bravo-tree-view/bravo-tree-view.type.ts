export interface TreeNode {
    name: string;
    disables?: boolean;
    children?: TreeNode[];
}



export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
    disabled: boolean;
}
