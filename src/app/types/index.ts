type FormSubmissionResponse = {
  status: 'success' | 'failure';
  message: string;
};
type AuthResponse = { token: string; auth: boolean; status: string };
type Task = {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  progress: number;
  user_id: number;
};
type User = {
  username?: string;
  email: string;
  password: string;
};

export { FormSubmissionResponse, Task, User, AuthResponse };
