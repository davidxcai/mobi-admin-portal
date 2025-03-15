export interface User {
  username: string | null;
  student_id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
}
