import { PageInfo } from './page-info';
import { VideoItem } from './video-item';

export interface VideosPage{
    items: VideoItem[];
    pageInfo: PageInfo;
}
