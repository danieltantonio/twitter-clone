export type UserData = {
    id: string,
    displayName: string,
    userName: string,
    createdAt: Date,
    avatarUrl: string,
    headerUrl: string,
    bio: string,
    isPrivate: boolean,
    init?: boolean
}