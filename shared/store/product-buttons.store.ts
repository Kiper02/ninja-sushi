

export const useProductButtonsStore = defineStore('product-buttons', {
    state: () => ({id: 1}),
    actions: {
        set(id: number) {
            this.$patch({id})
        }
    }
})