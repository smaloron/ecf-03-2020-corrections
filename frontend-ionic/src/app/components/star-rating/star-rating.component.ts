import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {

  @Input() symbol;

  maxValue = 10;

  values = [];

  value = 7;

  @Output() selectedRatingChange: EventEmitter<number> = new EventEmitter();

  @Input()
  get selectedRating(){
    return this.value;
  }

  set selectedRating(val){
    this.value = val;
    this.selectedRatingChange.emit(this.value);
  }


  constructor() {
    this.values = Array(this.maxValue)
        .fill(0)
        .map((item, index) => index + 1);
  }

  ngOnInit() {}

  setValue(n) {
    this.value = n;
    this.selectedRatingChange.emit(this.value);
  }

}
