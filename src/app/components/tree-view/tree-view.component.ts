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
      name: 'Zapatos',
      children: [
        { name: 'Deportivos' },
        {
          name: 'Vestir',
          children: [
            { name: 'Punta' },
            { name: 'Cuero' },
            { name: 'Cuero sintético' },
          ]
        }
      ]
    },
    {
      name: 'Franelas',
      children: [
        { name: 'Camisas' },
        { name: 'Chemises' }
      ]
    }
  ];

  toggleNode(node: TreeNode): void {
    if (!node.children) return;
    node.expanded = !node.expanded;
  }
}
