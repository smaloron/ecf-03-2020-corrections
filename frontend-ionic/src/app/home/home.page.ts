import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface ConcertInterface {
  id: number;
  bandName: string;
  locationName: string;
  performanceDate: Date;
  rating: number
}

export const URL = 'http://localhost:3000/';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public concertList = Array<ConcertInterface>();

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {


  }

  ionViewDidEnter(){
    this.loadData();
  }

  private loadData(){
    this.http.get(URL ).subscribe(
        (data: any) => {
          console.log('ok');
          console.log(data);
          this.concertList = data.map((item)=>{
            return {
              id: item.id,
              bandName: item.band_name,
              locationName: item.location_name,
              rating: item.rating,
              performanceDate: new Date(item.performance_date)
            }
          });
        },
        (err) => console.log(err)
    );
  }



}
