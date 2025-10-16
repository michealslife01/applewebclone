import { create } from 'zustand'

export const useMacStore = create((set)=> {
    return{
        color: '#2e2c2e',
        size: 16,
        setColor: (color: string) => set({ color }),
        setSize: (size: number) => set({ size }),
        scale:0.08,
        setScale: (scale: number) => set({scale}),

        reset: () => set({color:'#2e2c2e', size:16, scale:0.08}),
    }
})

export default useMacStore;