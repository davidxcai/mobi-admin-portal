export interface Event {
  id: string;
  created_at: string;
  create_by: string;
  title: string;
  location: string;
  momocoins: number;
  attendance: number;
  starts_at: string;
  ends_at: string;
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
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  username: string;
  momocoins: number;
  role: string;
  account_status: string;
  active: boolean;
}
