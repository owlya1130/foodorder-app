import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    uid: new FormControl(null),
    name: new FormControl('', Validators.required),
    qty: new FormControl(1, Validators.required),
    unit: new FormControl('', Validators.required)
  });

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() { }

  onSubmit() {
    const subscriber = this.ingredientSvc
      .saveOrUpdate(this.form.getRawValue())
      .subscribe((data) => {
        this.modalCtrller.dismiss();
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }

}
