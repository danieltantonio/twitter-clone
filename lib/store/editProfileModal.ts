import { create } from "zustand";

type EditProfileModalState = {
    editProfileModal: boolean,
    setEditProfileModal: (editProfileModalState: boolean) => void
}

export const useEditProfileModalState = create<EditProfileModalState>((set) => ({
    editProfileModal: false,
    setEditProfileModal: (editProfileModal) => { set((state) => ({
        ...state,
        editProfileModal
    }))}
}));