import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderLogDetail } from 'src/app/interfaces/order-log-detail';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss'],
})
export class ShowOrderComponent implements OnInit {

  @Input() orderLogDetails: OrderLogDetail[];
  @Input() table: string;

  constructor(private modalCtrller: ModalController) { }

  ngOnInit() { }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}
