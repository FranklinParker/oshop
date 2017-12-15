import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  id: string;
  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
    console.log('id:' + this.id);
  }

  ngOnInit() {
  }

}
