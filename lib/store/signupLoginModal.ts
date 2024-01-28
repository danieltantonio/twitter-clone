import { create } from "zustand";

type ModalState = {
    loginModal: boolean,
    signupModal: boolean,
    setLoginModal: (loginModal: boolean) => void,
    setSignupModal: (signinModal: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
  loginModal: false,
  signupModal: false,
  setLoginModal: () => { set((state) => ({
    loginModal: !state.loginModal,
    signupModal: false
  }))},
  setSignupModal: () => { set((state) => ({
    loginModal: false,
    signupModal: !state.signupModal
  }))}
}));
