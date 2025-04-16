interface IAsideData {
    id: number;
    name: string;
    icon: string;
    link: string;
}

export const asideData: IAsideData[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: '/admin/dashboard.svg',
        link: '/admin/dashboard'
    },
    {
        id: 2,
        name: "Продукты",
        icon: '/admin/products.svg',
        link: '/admin/products'
    }
]