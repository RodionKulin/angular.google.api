import { VideoThumbnail } from './video-thumbnail';

export interface VideoSnippet {
    publishedAt: Date;
    title: string;
    description: string;
    thumbnails:  {
        [key: string]: VideoThumbnail
    };
}
