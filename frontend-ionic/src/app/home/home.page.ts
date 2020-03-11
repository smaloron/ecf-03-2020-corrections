import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// Définition de la structure
// des données d'un concert
interface ConcertInterface {
    id: number;
    bandName: string;
    locationName: string;
    performanceDate: Date;
    rating: number;
}

// Définition de l'URL du backend
export const URL = 'http://localhost:3000/';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    // déclaration du tableau accueillant les données
    // de la requête sur le backend
    public concertList = Array<ConcertInterface>();

    // Injection des dépendances dans le constructeur
    // A l'instanciation de l'objet Homepage
    // Le système fournira une instance de HttpClient
    constructor(private http: HttpClient) {
    }

    // Méthode exécutée à chaque affichage de la page
    ionViewDidEnter() {
        this.loadData();
    }

    // Méthode qui interroge le backend
    // et charge les données dans la variable concertList
    private loadData() {
        // httpClient envoie une requête au backend
        this.http.get(URL)
            // subscribe permet de s'abonner à la réponse
            .subscribe(
                // callback de succès de la réponse
                (data: any) => {
                    console.log('ok');
                    console.log(data);
                    // Transformation des données récupérées
                    // pour les exploiter dans le frontend
                    this.concertList = data.map(
                        // callback du map exécuté pour chaque élément de data
                        (item) => {
                            return {
                                id: item.id,
                                bandName: item.band_name,
                                locationName: item.location_name,
                                rating: item.rating,
                                performanceDate: new Date(item.performance_date)
                            };
                        });
                },
                // callback en cas d'erreur
                (err) => console.log(err)
            );
    }
}
