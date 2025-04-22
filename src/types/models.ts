export interface Event {
  id: string;
  created_at: string;
  created_by: string;
  title: string;
  location: string;
  momocoins: number;
  attendance: number;
  starts_at: Date;
  ends_at: Date;
  semester: string;
}

export interface CheckIn {
  id: string;
  event_id: string;
  created_at: string;
  checked_in_by: string;
  profile_id: string;
  momocoins: number;
}

export interface Profile {
  id: string | null;
  created_at: string | null;
  first_name: string;
  last_name: string;
  username: string | null;
  momocoins: number;
  role: string | "user";
  account_status: string | "pending";
  active: boolean | true;
}
