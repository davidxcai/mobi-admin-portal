export interface User {
  username: string | null;
  student_id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
}

export interface Event {
  eventId: string;
  eventName: string;
  location: string;
  time: {
    start: string;
    end: string;
  };
  momocoins: number;
  attendance: number;
}

export interface CheckIn {
  eventId: string;
  studentId: string;
  username: string | null;
  name: {
    first: string;
    last: string;
  };
  momocoins: number;
  time: string;
}
