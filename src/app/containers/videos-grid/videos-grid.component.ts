import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { GridOptions, IGetRowsParams  } from 'ag-grid-community';
import * as moment from 'moment';

import { VideosApiService } from '../../_services/videos-api.service';
import { VideosPage } from '../../_models/dtos/videos';
import { GridVideo } from '../../_models/viewmodels/videos';
import { GridSelectionToggleComponent } from '../../components/grid-selection-toggle/grid-selection-toggle.component';
import { GridSelectedRowsCountComponent } from '../../components/grid-selected-rows-count/grid-selected-rows-count.component';
import { GridSelectAllComponent } from '../../components/grid-select-all/grid-select-all.component';
import { GridRowSelectorComponent } from '../../components/grid-row-selector/grid-row-selector.component';

@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.css']
})
export class VideosGridComponent implements OnInit {
  _videosApiService: VideosApiService;
  gridOptions: GridOptions;
  isLoading = true;
  gridWidth = 950;

  constructor(videosApiService: VideosApiService) {
    this._videosApiService = videosApiService;
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    this.queryVideos();
  }

  queryVideos(): void {
    this._videosApiService.getVideos()
      .pipe(map((data: VideosPage) => {
          const videos = [];
          data.items.forEach(element => {
            videos.push(new GridVideo({
              thumbnail: element.snippet.thumbnails['default'].url,
              publishedAt: element.snippet.publishedAt,
              title: element.snippet.title,
              description: element.snippet.description,
              videoId: element.id.videoId
            }));
          });
          return videos;
      }))
      .subscribe(videos => {
        this.isLoading = false;
        this.initGrid(videos);
      });
  }

  initGrid(data): void {
    // columns
    this.gridOptions.columnDefs = [
        {
          colId: 'checkbox',
          width: 100,
          hide: true,
          cellRendererFramework: GridRowSelectorComponent,
          headerComponent: 'gridSelectAllComponent'
        },
        {
            headerName: '',
            field: 'thumbnail',
            width: 130,
            cellRenderer: this.renderThumbnail
        },
        {
            headerName: 'Published on',
            field: 'publishedAt',
            width: 130,
            cellRenderer: this.renderVideoDate
        },
        {
            colId: 'title',
            headerName: 'Video Title',
            field: 'title',
            width: 200,
            cellStyle: {'white-space': 'normal'},
            cellRenderer: this.renderVideoTitle,
            onCellContextMenu: (params) => { }
        },
        {
            colId: 'description',
            headerName: 'Description',
            field: 'description',
            width: 300,
            suppressNavigable: true,
            cellClass: 'no-border',
            cellStyle: {'white-space': 'normal'},
        }
    ];

    this.gridOptions.defaultColDef = {
      editable: false,
      enableRowGroup: false,
      sortable: false,
      resizable: false,
      filter: false
    };

    // components
    this.gridOptions.frameworkComponents = {
      gridSelectionToggleComponent: GridSelectionToggleComponent,
      gridSelectedRowsCountComponent: GridSelectedRowsCountComponent,
      gridSelectAllComponent: GridSelectAllComponent
    };
    this.gridOptions.statusBar = {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent' },
        { statusPanel: 'gridSelectedRowsCountComponent' },
        {
          statusPanel: 'gridSelectionToggleComponent',
          statusPanelParams: {
            gridWidth: this.gridWidth
          }
        }
      ]
    };

    // style
    this.gridOptions.suppressHorizontalScroll = true;
    this.gridOptions.getRowHeight = (params) => 90;

    // selection
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowMultiSelectWithClick = true;
    this.gridOptions.suppressCellSelection = true;

    // data
    this.gridOptions.rowData = data;
  }


  // render columns
  renderThumbnail(params): string {
    return params.data.thumbnail
      ? `<img src='${ params.data.thumbnail }' style='width:120px;height:90px'/>`
      : `<div style="width: 120px;height: 90px;background: black;"></div>`;
  }

  renderVideoDate(params): string {
    const date = moment(params.data.publishedAt);
    return date.isValid()
      ? date.zone('+00:00').format('YYYY/MM/DD HH:mm')
      : '';
  }

  renderVideoTitle(params): string {
    return params.data.videoId
      ? `<a target='_blank' href='https://www.youtube.com/watch?v=${ params.data.videoId }'>${ params.data.title }</a>`
      : `<span>${ params.data.title }</span>`;
  }


  // grid events
  onGridReady($event): void {
    this.gridOptions.columnApi.sizeColumnsToFit(this.gridWidth);
  }

  getContextMenuItems(params) {
    const menuItems: any[] = params.defaultItems;

    if (params.column.colId === 'title') {
      menuItems.push({
          name: 'Open in new tab',
          tooltip: 'Open new browser tab with video',
          action: function() {
            const videoId = params.node.data.videoId;
            const url = `https://www.youtube.com/watch?v=${ videoId }`;
            window.open(url, '_blank');
          }
      });
    }

    return menuItems;
  }

}
