
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import ImportData from './components/ImportData';
import ChatBot from './components/ChatBot';
import { Menu, Ship } from 'lucide-react';
import { AppState, StudentInfo, ScheduleItem, GradeItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, setState] = useState<AppState>({
    student: null,
    schedule: [],
    grades: [],
    isProcessing: false
  });

  // Load data from localStorage on startup (nhớ dữ liệu như app thật)
  useEffect(() => {
    const saved = localStorage.getItem('vmu_student_data');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi load dữ liệu cũ");
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (state.student || state.schedule.length > 0) {
      localStorage.setItem('vmu_student_data', JSON.stringify(state));
    }
  }, [state]);

  const updateStudent = (student: StudentInfo) => {
    setState(prev => ({ ...prev, student }));
  };

  const updateSchedule = (schedule: ScheduleItem[]) => {
    setState(prev => ({ ...prev, schedule }));
  };

  const updateGrades = (grades: GradeItem[]) => {
    setState(prev => ({ ...prev, grades }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          student={state.student} 
          schedule={state.schedule} 
          grades={state.grades} 
          onUpdateStudent={updateStudent}
          onNavigate={setActiveTab}
        />;
      case 'schedule':
        return <Schedule 
          items={state.schedule} 
          onUpdateSchedule={updateSchedule}
        />;
      case 'grades':
        return <Grades 
          items={state.grades} 
          onUpdateGrades={updateGrades}
        />;
      case 'assistant':
        return <ChatBot context={{ student: state.student, schedule: state.schedule, grades: state.grades }} />;
      case 'import':
        return <ImportData setAppState={setState} />;
      default:
        return <Dashboard student={state.student} schedule={state.schedule} grades={state.grades} onUpdateStudent={updateStudent} onNavigate={setActiveTab} />;
    }
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Tổng quan';
      case 'schedule': return 'Lịch học';
      case 'grades': return 'Bảng điểm';
      case 'assistant': return 'Trợ lý AI';
      case 'import': return 'Nhập dữ liệu';
      default: return 'VMU Assistant';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col lg:flex-row safe-area-pb">
      {/* Mobile Header - Sticky và Blur như iOS/Android app */}
      <header className="lg:hidden bg-[#004a99]/95 backdrop-blur-md text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md safe-area-pt">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 active:scale-90 transition-transform rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-lg tracking-tight">{getTabTitle()}</span>
        </div>
        <Ship className="w-6 h-6 text-blue-300" />
      </header>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full">
        <div className="max-w-7xl mx-auto pb-20 lg:pb-0">
          {renderContent()}
        </div>
      </main>

      {/* Nút AI nổi đặc trưng cho Mobile App */}
      {activeTab !== 'assistant' && state.student && (
        <button 
          onClick={() => setActiveTab('assistant')}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#004a99] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 lg:z-50 border-4 border-white"
          title="Hỏi trợ lý AI"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4m0 0L9 7m3-3l3 3M4 12h4m0 0l-3-3m3 3l-3 3M20 12h-4m0 0l3-3m-3 3l3 3M12 16v4m0 0l-3-3m3 3l3 3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
