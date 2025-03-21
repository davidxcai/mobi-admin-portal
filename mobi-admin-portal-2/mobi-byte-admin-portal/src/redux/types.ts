export interface User {
  username: string | null;
  student_id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Event {
  eventId: string;
  eventName: string;
  location: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  eventCreatedBy: string;
  momocoins: number;
  attendance: number;
}

export interface CheckIn {
  eventId: string;
  studentId: string;
  username: string | null;
  firstName: string;
  lastName: string;
  checkedInBy: string;
  momocoins: number;
  time: string;
}
