import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTreeModule } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { TreeNode } from './bravo-tree-view.type';

const TREE_DATA: TreeNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' }
    ]
  },
  {
    name: 'Vegetables',
    children: [
        { name: 'Tomato',
            children: [
                { name: 'Apple' },
                { name: 'Banana' }
            ]
        },
        { name: 'Potato' }
    ]
  }
];

@Component({
    selector: 'br-tree-view',
    templateUrl: './bravo-tree-view.component.html',
    styleUrls: ["./bravo-tree-view.component.scss"],
    imports: [CdkTreeModule]
})

export class BravoTreeViewComponent {
    public dataSource = new ArrayDataSource(TREE_DATA);

    public expanded = new Set<TreeNode>();

    public toggle(node: TreeNode) {
        this.expanded.has(node)
            ? this.expanded.delete(node)
            : this.expanded.add(node);
    }

    public isExpanded (_: number, node: TreeNode) {
        return this.expanded.has(node);
    } 

    public hasChild (_: number, node: TreeNode) {
        return !!node.children?.length;
    }

    public childrenAccessor (node: TreeNode) {
        return node.children ?? [];
    }
}