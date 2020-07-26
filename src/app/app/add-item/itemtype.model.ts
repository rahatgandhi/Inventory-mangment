export class Itemtype {
    name:string;
    price:Number;
    description:string;
    constructor(d:any){
    this.name = d.name || null;
    this.description =d.description || null;
    this.price =d.price || null;
    }
}
