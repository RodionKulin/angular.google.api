import { Component, ElementRef } from '@angular/core';
import { IHeaderParams } from 'ag-grid-community';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-all-rows-selector',
  template: `
  <input type="checkbox" (change)="onSelectAllToggle($event)" [(ngModel)]="isSelected">
  `
})
export class GridSelectAllComponent implements IHeaderAngularComp {
  params: IHeaderParams;
  isSelected: boolean;

  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
      this.elementRef = elementRef;
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
    this.updateSelectAllState();
    this.params.api.addEventListener('selectionChanged', this.updateSelectAllState.bind(this));
  }

  updateSelectAllState(): void {
    let hasUnchecked = false;
    this.params.api.forEachNode((node, index) => {
      if (!node.isSelected()) {
        hasUnchecked = true;
      }
    });

    this.isSelected = !hasUnchecked;
  }

  onSelectAllToggle($event): void {
    this.params.api.forEachNode((node, index) => {
      node.setSelected(this.isSelected);
    });
  }
}
