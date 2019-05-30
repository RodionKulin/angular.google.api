import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosGridComponent } from './videos-grid.component';

describe('VideosGridComponent', () => {
  let component: VideosGridComponent;

  beforeEach(() => {
    component = new VideosGridComponent(null);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should format published date on correct date', () => {
    const dateLabel = component.renderVideoDate({
      data: {
        publishedAt: '2011-05-12T20:01:31.000Z'
      }
    });
    expect(dateLabel).toBe('2011/05/12 20:01');
  });

  it('should return empty published label on wrong date', () => {
    const dateLabel = component.renderVideoDate({
      data: {
        publishedAt: 'not valid date'
      }
    });
    expect(dateLabel).toBe('');
  });

  it('should return video title without link on missing videoId', () => {
    const videoTitle = 'video name';
    const dateLabel = component.renderVideoTitle({
      data: {
        title: videoTitle,
        videoId: null
      }
    });
    expect(dateLabel).toBe(`<span>${ videoTitle }</span>`);
  });

  it('should return video title with link on present videoId', () => {
    const videoTitle = 'video name';
    const videoId = '12345';
    const dateLabel = component.renderVideoTitle({
      data: {
        title: videoTitle,
        videoId: videoId
      }
    });
    expect(dateLabel).toBe(`<a target='_blank' href='https://www.youtube.com/watch?v=${ videoId }'>${ videoTitle }</a>`);
  });
});
