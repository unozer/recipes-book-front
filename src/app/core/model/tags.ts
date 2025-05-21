export interface Tag {
    name?: string;
    key?: string;
}

export const TAGS: Tag[] = [
    { name: 'Vegetarian', key: 'vegetarian' },
    { name: 'Vegan', key: 'vegan' },
    { name: 'Gluten Free', key: 'gluten-free' },
    { name: 'Dairy Free', key: 'dairy-free' },
    { name: 'Nut Free', key: 'nut-free' },
    { name: 'Low Carb', key: 'low-carb' },
    { name: 'High Protein', key: 'high-protein' },
    { name: 'Paleo', key: 'paleo' },
    { name: 'Keto', key: 'keto' },
    { name: 'Italian', key: 'italian' },
]