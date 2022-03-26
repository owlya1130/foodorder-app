import { Injectable } from '@angular/core';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { AlertController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private modalCtrller: ModalController,
    private alertCtrller: AlertController
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

  async presentAlertConfirm(headerMsg: string,  msg: string) {
    const alert = await this.alertCtrller.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: headerMsg,
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, {
          text: '確定',
          role: 'confirm',
          id: 'confirm-button'
        }
      ]
    });

    await alert.present();
    return alert;
  }

  async presentAlert(headerMsg: string,  msg: string) {
    const alert = await this.alertCtrller.create({
      cssClass: 'my-custom-class',
      header: headerMsg,
      message: msg,
      buttons: [{
          text: '確定',
          role: 'confirm',
          id: 'confirm-button'
        }
      ]
    });

    await alert.present();
    return alert;
  }
}
