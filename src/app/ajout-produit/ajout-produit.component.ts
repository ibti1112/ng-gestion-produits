import { Component,OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit'; 
//import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})

export class AjoutProduitComponent implements OnInit {
  produits: any[] = [];
  //nouveauProduit: Produit = new Produit(); // l'attribut nouveauProduit de type Produit
  produitCourant: Produit = { id: 0, code: '', designation: '', prix: 0 }; // Assurez-vous que le type est correct

  constructor(private produitsService: ProduitsService) {
  }

  ngOnInit(): void {
    // À l'initialisation du composant, récupérez la liste des produits
    this.produitsService.getProduits().subscribe(
      (data) => {
        this.produits = data; // le service a une méthode getProduits() qui renvoie un observable ou une promesse.
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits : ', error);
      }
    );
  }
  validerFormulaire(): void {
    // pour vérifier si ID existe déjà
    const idExistant = this.produits.some((produit) => produit.id === this.produitCourant.id);

    if (idExistant) {
      alert('SVP verifier votre ID de produit: ID déjà existant!');
    } else {
      // sinon en appeler la méthode ajouterProduit pour déléguer le traitement
      this.ajouterProduit();
    }
  }

  ajouterProduit(): void {
    // pour appeler la méthode addProduit du service ProduitsService
    this.produitsService.addProduit(this.produitCourant).subscribe(
      (result) => {
        console.log('Produit ajouté avec succès!', result);

        // ici en effacer le contenu du formulaire
        this.produitCourant = { id: 0, code: '', designation: '', prix: 0 };
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit : ', error);
      }
    );
  }
}