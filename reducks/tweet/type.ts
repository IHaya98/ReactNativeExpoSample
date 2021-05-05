export type Tweet = {
    username?: string,
    uid?: string,
    email?: string,
    id?: string,
    title?: string,
    detail?: string,
    image?: ImageType | undefined,
    toggleModal?:any
}

export type ImageType = {
    id?: string,
    path?: string
}