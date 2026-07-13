import { create } from "zustand";

type AccessStatus = "idle" | "submitting" | "connected";

type AccessState = {
  handle: string;
  channel: string;
  status: AccessStatus;
  setHandle: (v: string) => void;
  setChannel: (v: string) => void;
  submit: () => void;
  reset: () => void;
};

export const useAccessStore = create<AccessState>((set) => ({
  handle: "",
  channel: "default",
  status: "idle",
  setHandle: (v) => set({ handle: v }),
  setChannel: (v) => set({ channel: v }),
  submit: () => {
    set({ status: "submitting" });
    // 模拟脉冲接入过程
    setTimeout(() => set({ status: "connected" }), 1400);
  },
  reset: () => set({ handle: "", channel: "default", status: "idle" }),
}));
