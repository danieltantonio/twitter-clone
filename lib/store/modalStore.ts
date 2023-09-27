import { create } from "zustand";

type ModalState = {
    loginModal: boolean,
    signupModal: boolean,
    setLoginModal: (loginModal: boolean) => void,
    setSignupModal: (signinModal: boolean) => void
}

export const useModalStore = create<ModalState>()((set) => {
    return (
        {
            loginModal: false,
            signinModal: false,
            setLoginModal: (loginModal) => set((state) => ({ ...state, loginModal })),
            setSignupModal: (signupModal) => set((state) => ({ ...state, signupModal }))
        }
    )
});