import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

const URL = 'http://localhost:3000/';

@Component({
    selector: 'app-form',
    templateUrl: './form.page.html',
    styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

    public concert = {
        band_id: 1,//null,
        location_id: 1,//null,
        performance_date: null,
        rating: 5//null
    };

    public locationList: Array<{ id: number, name: string }> = [];

    public bandList: Array<{ id: number, name: string }> = [];

    public ratingsList: Array<number> = [];

    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
      this.loadBandList();
      this.loadLocationList();
      this.ratingsList = Array(10)
          .fill(0)
          .map((item, index) =>{ return index +1 });
    }

    private loadLocationList() {
        this.http.get(URL + 'locations').subscribe(
            (data: any) => {
                this.locationList = data;
            }
        )
    }

    private loadBandList() {
        this.http.get(URL + 'bands').subscribe(
            (data: any) => {
                this.bandList = data;
            }
        )
    }

    validateForm() {

      console.log(this.concert.performance_date);

      this.concert.performance_date = this.concert.performance_date.substr(0, 10);

      this.http.post(URL + 'concert/new', this.concert).subscribe(
          ()=> { this.router.navigateByUrl('/home'); }
      );


    }

}
