import {asideData} from "~/components/admin/shared/aside.data";

export const useAsideStore = defineStore('active', {
    state: () => ({id: 1}),
    actions: {
        set(id: number) {
            this.id = id;
        },
        syncWithRoute(path: string) {
            const item = asideData.find(item => item.link === path);
            this.id = item?.id || 1;
        }
    }
})