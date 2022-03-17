import { Injectable } from '@angular/core';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private modalCtrller: ModalController
  ) { }

  async presentModal(
    comp: ComponentRef,
    compProps: ComponentProps<ComponentRef>,
    success = () => { }) {
    const modal = await this.modalCtrller.create({
      component: comp,
      componentProps: compProps,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      swipeToClose: true
    });
    await modal.present();
    modal.onWillDismiss().then((data) => {
      if (
        data.role === 'backdrop'
        || data.role === 'gesture'
        || data.role === 'cancel'
      ) {

      } else {
        success();
      }
    });
  }
}
