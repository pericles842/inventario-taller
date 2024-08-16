import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() nodes: TreeNode[] = [
    {
      name: 'Root 1',
      children: [
        { name: 'Child 1.1' },
        { name: 'Child 1.2',
           children: [
            { name: 'Child 1.2.1' },
            { name: 'Child 1.2.1' },
            { name: 'Child 1.2.1' },
          ] }
      ]
    },
    {
      name: 'Root 2',
      children: [
        { name: 'Child 2.1' },
        { name: 'Child 2.2' }
      ]
    }
  ];

  toggleNode(node: TreeNode): void {
    if (!node.children) return;
    node.expanded = !node.expanded;
  }
}
