import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const URL = 'http://localhost:3000/';

@Component({
    selector: 'app-form',
    templateUrl: './form.page.html',
    styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
    // Objet pour recevoir la saisie de l'utilisateur
    // Les clef ont le même nom que les colonnes de la BD
    public concert = {
        band_id: null,
        location_id: null,
        performance_date: null,
        rating: 2
    };

    // Liste des lieux pour affichage dans la liste déroulante
    public locationList: Array<{ id: number, name: string }> = [];
    // Liste des groupes
    public bandList: Array<{ id: number, name: string }> = [];
    // Liste des notes
    public ratingsList: Array<number> = [];

    // Injection de HttpClient pour communiquer avec le backend
    // et de Router pour naviguer vers l'écran d'accueil
    constructor(private http: HttpClient, private router: Router) {
    }

    // Initialisation du formulaire
    // hydratation des variables
    ngOnInit() {
      this.loadBandList();
      this.loadLocationList();
      this.ratingsList = Array(10)
          .fill(0)
          .map((item, index) => index + 1);
    }

    private loadLocationList() {
        this.http.get(URL + 'locations').subscribe(
            (data: any) => {
                this.locationList = data;
            }
        );
    }

    private loadBandList() {
        this.http.get(URL + 'bands').subscribe(
            (data: any) => {
                this.bandList = data;
            }
        );
    }

    validateForm() {

      console.log(this.concert.performance_date);

      this.concert.performance_date = this.concert.performance_date.substr(0, 10);

      this.http.post(URL + 'concert/new', this.concert).subscribe(
          () => { this.router.navigateByUrl('/home'); }
      );


    }

}
