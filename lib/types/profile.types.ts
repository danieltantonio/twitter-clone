export type ProfilePics = {
    avatar: string,
    header: string
}

export type EditMedia = {
    editMediaAvatar: boolean,
    editMediaHeader: boolean
}

export type ProfileData = {
    avatar: string,
    header: string,
    name: string,
    bio: string,
    private: boolean
}

export type ProfileDataError = {
    name: boolean
}