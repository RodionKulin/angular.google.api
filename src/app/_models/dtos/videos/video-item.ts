import { VideoId } from './video-id';
import { VideoSnippet } from './video-snippet';

export interface VideoItem {
    id: VideoId;
    snippet: VideoSnippet;
}
