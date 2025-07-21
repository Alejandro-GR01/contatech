export type  OptionItem = {
    name: string,
    value: string,
    id: number,
    disabled: boolean
}

export const navMenu = [
    {
        name: 'Home',
        link: '/',
        id:1
    },
    {
        name: 'About us',
        link: '/about',
        id: 2
    },
    {
        name: 'Blog',
        link: '/blog',
        id: 3
    },
    {
        name: 'How to use',
        link: '/how',
        id: 4
    },{
        name: 'Use it',
        link: 'use',
        id: 5
    },
    {
        name: 'Contact',
        link: '/contact',
        id: 6
    },

]

export const modeProduct : OptionItem[] = [
    {
        name: 'Select a mode',
        value: 'DEFAULT',
        id: 1,
        disabled: true
    },{
        name: 'Buy',
        value: 'buy',
        id: 2,
        disabled: false

    }, {
        name: 'Sale',
        value: 'sale',
        id: 3,
        disabled: false
    }

]

export const typeProduct : OptionItem[] = [
    {
        name: 'Select a type',
        value: 'DEFAULT',
        id: 1,
        disabled: true
    },{
        name: 'Drink',
        value: 'drink',
        id: 2,
        disabled: false

    }, {
        name: 'Food',
        value: 'food',
        id: 3,
        disabled: false
    }, {
        name: 'Clothes',
        value: 'clothes',
        id: 4,
        disabled: false
    }

]

export const measureProduct : OptionItem[] = [
    {
        name: 'Select a measure',
        value: 'DEFAULT',
        id: 1,
        disabled: true
    },{
        name: 'Lb',
        value: 'lb',
        id: 2,
        disabled: false
    },{
        name: 'Kg',
        value: 'kg',
        id: 3,
        disabled: false
    },{
        name: 'Pkg',
        value: 'pkg',
        id: 4,
        disabled: false
    },{
        name: 'U',
        value: 'u',
        id: 5,
        disabled: false
    }
]