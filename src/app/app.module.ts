import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from "ag-grid-angular";
import 'ag-grid-enterprise';

import { AppComponent } from './app.component';
import { VideosGridComponent } from './containers/videos-grid/videos-grid.component';
import { GridSelectAllComponent } from './components/grid-select-all/grid-select-all.component';
import { GridSelectionToggleComponent } from './components/grid-selection-toggle/grid-selection-toggle.component';
import { GridSelectedRowsCountComponent } from './components/grid-selected-rows-count/grid-selected-rows-count.component';
import { GridRowSelectorComponent } from './components/grid-row-selector/grid-row-selector.component';
import { ErrorInterceptor } from './_interceptors';

@NgModule({
  declarations: [
    AppComponent,
    VideosGridComponent,
    GridSelectAllComponent,
    GridSelectionToggleComponent,
    GridSelectedRowsCountComponent,
    GridRowSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([
      GridSelectAllComponent,
      GridSelectionToggleComponent,
      GridSelectedRowsCountComponent,
      GridRowSelectorComponent
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
