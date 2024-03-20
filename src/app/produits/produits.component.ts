import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  produitCourant: Produit = new Produit();
  containerClass: string = 'container';


  constructor(private produitsService: ProduitsService, 
    private http: HttpClient)
   {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("Succès GET");
        this.produits = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }

  supprimerProduit(p: Produit) {
    if (p.id !== undefined) {
      const confirmDelete = confirm(`Voulez-vous supprimer le produit : ${p.designation} ?`);
      if (confirmDelete) {
        this.envoyerRequeteDelete(p);
      }
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  private envoyerRequeteDelete(product: Produit) {
    if (product.id !== undefined) {
      this.produitsService.deleteProduit(product.id).subscribe({
        next: () => {
          console.log('Succès DELETE', product);
          const index = this.produits.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.produits.splice(index, 1);
          }
          this.effacerSaisie(); // Effacer la saisie après la suppression
        },
        error: error => {
          console.error('Erreur DELETE', error);
        }
      });
    } else {
      console.error("Trying to delete a product without an ID");
    }
  }

  editerProduit(p: Produit) {
    console.log("Editer le produit : ", p);
    this.produitCourant = { ...p }; // Cloner l'objet pour éviter de modifier directement l'objet dans la liste
  }

  effacerSaisie() {
    console.log("Effacer la saisie");
    this.produitCourant = new Produit();
  }

  /*produitExiste(id: number): boolean {
    console.log(`Vérifier si le produit avec l'ID ${id} existe`);
    return this.produits.some(p => p.id === id);
  }*/
  produitExiste(id: number): boolean {
    return this.produits.some(p => p.id === id);
}
  validerFormulaire(form: NgForm) {
    console.log(form.value);
    // pour vérifier si l'ID existe déjà dans la liste
    const existingProduct = this.produits.find(p => p.id === form.value.id);

    if (existingProduct) {
      // Afficher une boîte de dialogue pour confirmer la mise à jour
      const reponse: boolean = confirm("Vérifier votre ID!... Voulez-vous mettre à jour le produit existant ?");
      
      if (reponse) {
        console.log("Mise à jour confirmée...");
        // Mettre à jour les propriétés du produit existant avec les nouvelles valeurs
        existingProduct.code = form.value.code;
        existingProduct.designation = form.value.designation;
        existingProduct.prix = form.value.prix;
      } else {
        console.log("Mise à jour annulée...");
      }
    } else {
      console.log("Ajout avec succès!...");
      this.produits.push(form.value);
     //Faire l'ajout côté serveur avec une requête HTTP POST
      this.http.post<Produit>("http://localhost:3333/produits", form.value)
        .subscribe(addedProduct => {
          console.log('Ajout côté serveur réussi', addedProduct);
          this.produits.push(addedProduct);
        }, error => {
          console.error('Erreur lors de l\'ajout côté serveur', error);
        });
    }
    
    
  }

  private ajouterProduit(newProduct: Produit) {
    this.produitsService.addProduit(newProduct).subscribe({
      next: (addedProduct: Produit) => {
        console.log('Succès POST', addedProduct);
        this.produits.push(addedProduct);
        this.effacerSaisie();
      },
      error: error => {
        console.error('Erreur POST', error);
      }
    });
  }
  private mettreAJourProduit(updatedProduct: Produit) {
    console.log('Mise à jour du produit : ', updatedProduct);
}
}