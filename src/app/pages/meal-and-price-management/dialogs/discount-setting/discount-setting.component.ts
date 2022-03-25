import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DiscountConfig } from 'src/app/interfaces/discount-config';
import { MealAndPriceService } from 'src/app/services/meal-and-price.service';

@Component({
  selector: 'app-discount-setting',
  templateUrl: './discount-setting.component.html',
  styleUrls: ['./discount-setting.component.scss'],
})
export class DiscountSettingComponent implements OnInit {

  @Input() discountCfg: DiscountConfig;
  form = new FormGroup({
    uid: new FormControl(null),
    name: new FormControl('', Validators.required),
    operator: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });

  constructor(
    private mpSvc: MealAndPriceService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    if (this.discountCfg !== undefined) {
      this.form.patchValue(this.discountCfg);
    }
  }

  onSubmit() {
    const subscriber = this.mpSvc
      .updateDiscountConfig(this.form.getRawValue())
      .subscribe((data) => {
        this.modalCtrller.dismiss();
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}
