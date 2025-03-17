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
  attendance: number;
}
