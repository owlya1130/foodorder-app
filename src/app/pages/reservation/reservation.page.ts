import { Component, OnInit } from '@angular/core';
import { DiningTable } from 'src/app/interfaces/dining-table';
import { Reservation } from 'src/app/interfaces/reservation';
import { DialogService } from 'src/app/services/component/dialog.service';
import { DiningTableService } from 'src/app/services/dining-table.service';
import { ReservationTimeblockService } from 'src/app/services/reservation-timeblock.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { MakeReservationComponent } from './dialogs/make-reservation/make-reservation.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  queryDateStr: string;
  timePeriods: Date[] = [];
  diningTables: DiningTable[] = [];
  presentDatas: PresentData[] = [];
  resvBlock: number;

  constructor(
    private diningTableSvc: DiningTableService,
    private dlgSvc: DialogService,
    private reservationSvc: ReservationService,
    private rsvTimeblkSvc: ReservationTimeblockService
  ) {
    this.queryDateStr = this.dateTrans(new Date());
    this.getReservationTimeblock();
    this.queryCascade();
  }

  async ngOnInit() { }

  dateTrans(date: Date, withTime: boolean = false) {
    const dateStr = date.toLocaleDateString();
    const dateStrArr = dateStr.split('/');
    let dateTransfered = dateStrArr[0]
      + '-' + dateStrArr[1].padStart(2, '0')
      + '-' + dateStrArr[2].padStart(2, '0');
    if (withTime) {
      dateTransfered = dateTransfered
        + 'T' + date.getHours().toString().padStart(2, '0')
        + ':' + date.getMinutes().toString().padStart(2, '0')
        + ':00';
    }
    return dateTransfered;
  }

  async queryCascade() {
    this.getTimePeriod();
    await this.getDiningTables();
    this.getReservations();
  }

  onQueryDateChg(event: Event) {
    this.queryDateStr = (event.target as HTMLInputElement).value;
    this.queryCascade();
  }

  getTimePeriod() {
    this.timePeriods = [];
    for (let hr = 10; hr < 22; hr++) {
      const datetime = new Date(this.queryDateStr);
      datetime.setHours(hr, 0, 0);
      this.timePeriods.push(datetime);
      const datetimehalf = new Date(this.queryDateStr);
      datetimehalf.setHours(hr, 30, 0);
      this.timePeriods.push(datetimehalf);
    }
  }

  getReservations() {
    const subscriber = this.reservationSvc
      .findAll(new Date(this.queryDateStr))
      .subscribe(data => {
        this.combineData(data);
        subscriber.unsubscribe();
      });
  }

  async getDiningTables() {
    this.diningTables = (await this.diningTableSvc.findAll().toPromise()) as DiningTable[];
  }

  addReservation(presentData: PresentData, timePeriodIdx: number) {
    const timePeriodsSize = presentData.timePeriods.length;
    const leLimit = timePeriodIdx - this.resvBlock < 0 ? -1 : timePeriodIdx - this.resvBlock;
    const beLimit = timePeriodIdx + this.resvBlock > timePeriodsSize ? timePeriodsSize : timePeriodIdx + this.resvBlock;
    for (let i = timePeriodIdx; i > leLimit; i--) {
      if (presentData.timePeriods[i].reservation !== null) {
        return;
      }
    }
    for (let i = timePeriodIdx; i < beLimit; i++) {
      if (presentData.timePeriods[i].reservation !== null) {
        return;
      }
    }

    this.dlgSvc
      .presentModal(
        MakeReservationComponent,
        {
          table: presentData.table,
          minTime: this.dateTrans(presentData.timePeriods[timePeriodIdx].period, true),
          maxTime: this.dateTrans(this.timePeriods[this.timePeriods.length - 1], true)
        },
        () => { this.getReservations(); }
      );
  }

  updateReservation(presentData: PresentData, timePeriodIdx: number) {
    this.dlgSvc
      .presentModal(
        MakeReservationComponent,
        {
          table: presentData.table,
          minTime: this.dateTrans(presentData.timePeriods[timePeriodIdx].period, true),
          maxTime: this.dateTrans(this.timePeriods[this.timePeriods.length - 1], true),
          entity: presentData.timePeriods[timePeriodIdx].reservation,
          dateTrans: this.dateTrans
        },
        () => { this.getReservations(); }
      );
  }

  combineData(data: Reservation[]) {
    const presentDatas: PresentData[] = [];
    for (const diningTable of this.diningTables) {
      const timeperiods: {
        period: Date;
        reservation: Reservation;
        offset: number;
      }[] = [];

      // 循環時段
      for (const timePeriod of this.timePeriods) {
        const timeperiod = {
          period: timePeriod,
          reservation: null,
          offset: null
        };
        // 循環預約資料
        for (const d of data) {
          const resvDateTime = new Date(d.time);
          const periodDateTime = new Date(timePeriod);
          const diffMinutes = (resvDateTime.getTime() - periodDateTime.getTime()) / (60 * 1000);
          // 如果符合桌次且預約資料在時段區間
          if (d.tableUid === diningTable.uid && diffMinutes >= 0 && diffMinutes < 30) {
            timeperiod.reservation = d;
            timeperiod.offset = diffMinutes;
          }
        }
        timeperiods.push(timeperiod);
      }

      const presentData: PresentData = {
        table: diningTable,
        timePeriods: timeperiods
      };
      presentDatas.push(presentData);
    }
    this.presentDatas = presentDatas;
  }

  getReservationTimeblock() {
    const subscriber = this.rsvTimeblkSvc
      .findAll()
      .subscribe(data => {
        if (data.length > 0) {
          this.resvBlock = Number(data[0].name);
        }
        subscriber.unsubscribe();
      });
  }
}

interface PresentData {
  table: DiningTable;
  timePeriods: {
    period: Date;
    reservation: Reservation;
    offset: number;
  }[];
}
