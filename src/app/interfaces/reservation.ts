export interface Reservation {
  uid: number | null;
	time: Date;
	name: string;
	contactNo: string;
	adults: number;
	children: number;
	tableUid: string;
}
