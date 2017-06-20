export interface SavedImage {
    savedImageId: number;
    userId: string;
    description: string;
    tags: Array<SavedImageTag>;
    storageUrl: string;
}

export interface SavedImageTag {
    savedImageTagId: number;
    savedImageId: number;
    tag: string;
}