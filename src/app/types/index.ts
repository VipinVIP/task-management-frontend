type FormSubmissionResponse = {
  status: 'success' | 'failure';
  message: string;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  progress: number;
  user_id: number;
};

export { FormSubmissionResponse, Task };
