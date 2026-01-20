
export interface StudentInfo {
  name: string;
  studentId: string;
  major: string;
  class: string;
  birthday?: string;
  gender?: string;
  accumulatedCredits?: number;
  gpa: number;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  room: string;
  day: string;
  timeSlot: string;
  lecturer: string;
  semester?: string; // Ví dụ: "Học kỳ 1"
  year?: string;     // Ví dụ: "2024-2025"
}

export interface GradeItem {
  id: string;
  subject: string;
  credits: number;
  score10: number;
  score4: number;
  letterGrade: string;
  semester: string; // "Học kỳ 1" hoặc "Học kỳ 2"
  year: string;     // "2024-2025"
}

export interface AppState {
  student: StudentInfo | null;
  schedule: ScheduleItem[];
  grades: GradeItem[];
  isProcessing: boolean;
}
