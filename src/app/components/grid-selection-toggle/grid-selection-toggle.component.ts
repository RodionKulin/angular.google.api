import { Component, ViewChild, ViewContainerRef} from '@angular/core';

import { IAfterGuiAttachedParams, IDoesFilterPassParams, RowNode } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-status-component',
    template: `
    <span class="ag-name-value ag-status-panel"><input type="button" (click)="onClick()" value="Toggle selection"/></span>
    `
})
export class GridSelectionToggleComponent {
    params: any;
    gridWidth: number;

    agInit(params: any): void {
        this.params = params;
        this.gridWidth = params.gridWidth;
    }

    onClick(): void {
        const api = this.params.columnApi;
        const checkboxColumn = api.getColumn('checkbox');

        const updatedCheckboxVisible = !checkboxColumn.visible;
        api.setColumnVisible('checkbox', updatedCheckboxVisible);
        api.sizeColumnsToFit(this.gridWidth);

        // supress row click when checkbox selection enabled
        this.params.api.gridOptionsWrapper
            .gridOptions.suppressRowClickSelection = updatedCheckboxVisible;
    }
}
