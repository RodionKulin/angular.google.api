import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-row-selector',
  template: `
  <input type="checkbox" (change)="onSelectionChange($event)" [checked]="params.node.selected">
  `
})
export class GridRowSelectorComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onSelectionChange($event): void {
    const updatedSelected = !this.params.node.isSelected();
    this.params.node.setSelected(updatedSelected);
  }
}
