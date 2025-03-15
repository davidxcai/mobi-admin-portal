// Purpose: Contains data that is used for development purposes.
// This file is used to simulate the data that would be retrieved from the backend.

import { CheckIn } from "../redux/slices/checkinSlice";
import { Event } from "../redux/slices/eventsSlice";

type User = {
  username: string;
  student_id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
};

export const userData: User = {
  username: "dxc0148",
  student_id: "1002230148",
  name: {
    first: "David",
    last: "Cai",
  },
  role: "admin",
};

export const menuItems = [
  "Dashboard",
  "Manage",
  "Card Swipe",
  "Events",
  "Merchandise",
  "Projects",
  "Settings",
];

const eventsData: Event[] = [
  {
    event_id: "EVT001",
    title: "Hackathon 2025",
    location: "Tech Innovation Center",
    date: {
      start: "2025-03-11T22:00:00.037+00:00",
      end: "2025-03-11T22:30:00.108+00:00",
    },
    attendance: 150,
  },
  {
    event_id: "EVT002",
    title: "AI & Machine Learning Conference",
    location: "Grand Convention Hall",
    date: {
      start: "2025-02-27T22:45:00.000+00:00",
      end: "2025-03-11T22:30:00.918+00:00",
    },
    attendance: 500,
  },
  {
    event_id: "EVT003",
    title: "Web Development Bootcamp",
    location: "Online",
    date: {
      start: "2025-03-11T22:30:00.027+00:00",
      end: "2025-03-11T22:45:00.000+00:00",
    },
    attendance: 300,
  },
  {
    event_id: "EVT004",
    title: "Cybersecurity Summit",
    location: "Global Security Forum",
    date: {
      start: "2025-03-06T23:15:00.000+00:00",
      end: "2025-03-11T23:00:00.068+00:00",
    },
    attendance: 200,
  },
  {
    event_id: "EVT005",
    title: "Blockchain & Cryptocurrency Expo",
    location: "Finance Tech Hub",
    date: {
      start: "2025-03-11T23:30:00.617+00:00",
      end: "2025-03-12T01:00:00.000+00:00",
    },
    attendance: 350,
  },
];

const checkInData: CheckIn[] = [
  {
    event_id: "EVT123",
    student_id: "abcd1234efgh5678ijkl9012mnop3456qrst7890",
    username: "davidcai",
    name: {
      first: "David",
      last: "Cai",
    },
    momocoins: 10,
    time: "2025-03-12T10:15:30Z",
  },
  {
    event_id: "EVT124",
    student_id: "mnop1234qrst5678uvwx9012yzab3456cdef7890",
    username: "janedoe",
    name: {
      first: "Jane",
      last: "Doe",
    },
    momocoins: 5,
    time: "2025-03-12T11:20:45Z",
  },
  {
    event_id: "EVT125",
    student_id: "uvwx1234yzab5678cdef9012ghij3456klmn7890",
    username: "johndoe",
    name: {
      first: "John",
      last: "Doe",
    },
    momocoins: 7,
    time: "2025-03-12T12:35:50Z",
  },
  {
    event_id: "EVT126",
    student_id: "ghij1234klmn5678opqr9012stuv3456wxyz7890",
    username: null,
    name: {
      first: "Alice",
      last: "Smith",
    },
    momocoins: 12,
    time: "2025-03-12T13:45:00Z",
  },
  {
    event_id: "EVT127",
    student_id: "opqr1234stuv5678wxyz9012abcd3456efgh7890",
    username: "bobmarley",
    name: {
      first: "Bob",
      last: "Marley",
    },
    momocoins: 8,
    time: "2025-03-12T14:50:15Z",
  },
];

export { eventsData, checkInData };
