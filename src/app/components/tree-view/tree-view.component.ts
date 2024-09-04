import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNodeCategory } from 'src/app/interfaces/ConfigsFormsData.interface';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Output() edit = new EventEmitter<TreeNodeCategory>();
  @Output() delete = new EventEmitter<TreeNodeCategory>();
  @Input() nodes: TreeNodeCategory[] = []
  @Input() displayed: boolean = false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayed']) {
      this.nodes.map(node => node.expanded = changes['displayed'].currentValue)
    }
  }
  /**
   *Desplega el arbol
   *
   * @param {TreeNodeCategory} node
   * @return {*}  {void}
   * @memberof TreeViewComponent
   */
  toggleNode(node: TreeNodeCategory): void {
    if (!node.children) return;
    node.expanded = !node.expanded;
  }
  /**
   *Emite editar
   *
   * @param {TreeNodeCategory} node
   * @memberof TreeViewComponent
   */
  editEvent(node: TreeNodeCategory): void {
    node.expanded = false;
    this.edit.emit(node);
  }
  /**
   *emite borrar
   *
   * @param {TreeNodeCategory} node
   * @memberof TreeViewComponent
   */
  deleteEvent(node: TreeNodeCategory): void {
    node.expanded = false;
    this.delete.emit(node);
  }
}
