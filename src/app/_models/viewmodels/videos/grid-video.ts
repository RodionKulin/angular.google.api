export class GridVideo {
    thumbnail: string;
    publishedAt: Date;
    title: string;
    description: string;
    videoId: string;

    public constructor(init?: Partial<GridVideo>) {
        Object.assign(this, init);
    }
}
