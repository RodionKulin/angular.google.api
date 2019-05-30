import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { IAfterGuiAttachedParams, IDoesFilterPassParams, RowNode } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-total-count-component',
    template: `
    <span class="ag-name-value ag-status-panel">Selected rows:
        <span class="ag-name-value-value">{{totalCount}}</span>
    </span>
    `
})
export class GridSelectedRowsCountComponent {
    _params:  any;
    totalCount: number;

    agInit(params: any): void {
        this._params = params;
        this.totalCount = 0;

        params.api.addEventListener('selectionChanged', this.updateSelectedRowsCount.bind(this));
    }

    updateSelectedRowsCount(): void {
        const selectedRows = this._params.api.getSelectedRows();
        this.totalCount = selectedRows.length;
    }
}
