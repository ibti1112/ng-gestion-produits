export class Produit {
    id: number | undefined;
    code: string | undefined;
    designation: string | undefined;
    prix: number | undefined;
  
    constructor() {
      this.id = undefined;
      this.code = undefined;
      this.designation = undefined;
      this.prix = undefined;
    }
  }