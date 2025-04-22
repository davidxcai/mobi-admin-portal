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
