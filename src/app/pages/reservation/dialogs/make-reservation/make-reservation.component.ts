import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/reservation';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
})
export class MakeReservationComponent implements OnInit {
  @Input() table: DiningTable;
  @Input() minTime: string;
  @Input() maxTime: string;
  @Input() entity: Reservation = null;
  @Input() dateTrans: (date: Date, withTime: boolean) => string;

  form = new FormGroup({
    uid: new FormControl(null),
    time: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
    adults: new FormControl(0, [Validators.required, Validators.min(1)]),
    children: new FormControl(0),
    tableUid: new FormControl('', Validators.required)
  });

  tables: DiningTable[] = [];

  constructor(
    private reservationSvc: ReservationService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    if(this.entity === null) {
      this.form.patchValue({
        tableUid: this.table.uid
      });
      this.form.patchValue({
        time: this.minTime
      });
    } else {
      this.form.setValue(this.entity);
      this.form.patchValue({
        time: this.dateTrans(new Date(this.entity.time), true)
      });
    }
  }

  onSubmit() {
    const rawValue = this.form.getRawValue();
    rawValue.time = new Date(rawValue.time);
    const subscriber = this.reservationSvc
      .saveOrUpdate(rawValue)
      .subscribe((data) => {
        if(data === null) {
          alert('無法預約');
        } else {
          this.modalCtrller.dismiss();
        }
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}
