export class Product {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public unitPrice: number,
        public description: string,
        public imageUrl: string,
        public unitsInStock: number,
        public active: boolean,
        public dateCreated: Date,
        public lastUpdated: Date,
        ){

    }
}
