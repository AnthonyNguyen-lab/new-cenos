/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search, 
  Plus, 
  MoreVertical, 
  Bell, 
  User,
  LogOut,
  ChevronRight,
  Filter,
  Download,
  Mail,
  Phone,
  AlertCircle,
  AlertTriangle,
  DollarSign,
  Wallet,
  History,
  School,
  X,
  Clock,
  Check,
  Info,
  Save,
  Edit3,
  ChevronUp,
  ChevronDown,
  Eye,
  Trash2,
  Edit2,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Student, ViewType, Contract, PaymentPeriod, Class, Teacher, Permission, AccessLevel } from './types';

const MOCK_PERMISSIONS: Record<string, Permission[]> = {
  'Admin': [
    // Student Management
    { id: '1', module: 'Student Management', feature: 'Students List', accessLevel: 'full' },
    { id: '2', module: 'Student Management', feature: 'Student Detail', accessLevel: 'full' },
    { id: '3', module: 'Student Management', feature: 'Contract Detail', accessLevel: 'full' },
    // Teacher Management
    { id: '4', module: 'Teacher Management', feature: 'Teachers List', accessLevel: 'full' },
    { id: '5', module: 'Teacher Management', feature: 'Teacher Detail', accessLevel: 'full' },
    // Training Management
    { id: '6', module: 'Training Management', feature: 'Classes', accessLevel: 'full' },
    { id: '7', module: 'Training Management', feature: 'Class Detail', accessLevel: 'full' },
    { id: '8', module: 'Training Management', feature: 'Schedule', accessLevel: 'full' },
    { id: '9', module: 'Training Management', feature: 'Courses', accessLevel: 'full' },
    // Finance & Reports
    { id: '10', module: 'Finance & Reports', feature: 'Finance', accessLevel: 'full' },
    { id: '11', module: 'Finance & Reports', feature: 'Reports', accessLevel: 'full' },
    // System
    { id: '12', module: 'System', feature: 'Permissions', accessLevel: 'full' },
    { id: '13', module: 'System', feature: 'Settings', accessLevel: 'full' },
  ],
  'Staff': [
    // Student Management
    { id: '1', module: 'Student Management', feature: 'Students List', accessLevel: 'full' },
    { id: '2', module: 'Student Management', feature: 'Student Detail', accessLevel: 'full' },
    { id: '3', module: 'Student Management', feature: 'Contract Detail', accessLevel: 'view' },
    // Teacher Management
    { id: '4', module: 'Teacher Management', feature: 'Teachers List', accessLevel: 'view' },
    { id: '5', module: 'Teacher Management', feature: 'Teacher Detail', accessLevel: 'view' },
    // Training Management
    { id: '6', module: 'Training Management', feature: 'Classes', accessLevel: 'full' },
    { id: '7', module: 'Training Management', feature: 'Class Detail', accessLevel: 'view' },
    { id: '8', module: 'Training Management', feature: 'Schedule', accessLevel: 'view' },
    { id: '9', module: 'Training Management', feature: 'Courses', accessLevel: 'none' },
    // Finance & Reports
    { id: '10', module: 'Finance & Reports', feature: 'Finance', accessLevel: 'none' },
    { id: '11', module: 'Finance & Reports', feature: 'Reports', accessLevel: 'view' },
    // System
    { id: '12', module: 'System', feature: 'Permissions', accessLevel: 'none' },
    { id: '13', module: 'System', feature: 'Settings', accessLevel: 'view' },
  ],
  'Viewer': [
    // Student Management
    { id: '1', module: 'Student Management', feature: 'Students List', accessLevel: 'view' },
    { id: '2', module: 'Student Management', feature: 'Student Detail', accessLevel: 'view' },
    { id: '3', module: 'Student Management', feature: 'Contract Detail', accessLevel: 'view' },
    // Teacher Management
    { id: '4', module: 'Teacher Management', feature: 'Teachers List', accessLevel: 'view' },
    { id: '5', module: 'Teacher Management', feature: 'Teacher Detail', accessLevel: 'view' },
    // Training Management
    { id: '6', module: 'Training Management', feature: 'Classes', accessLevel: 'view' },
    { id: '7', module: 'Training Management', feature: 'Class Detail', accessLevel: 'view' },
    { id: '8', module: 'Training Management', feature: 'Schedule', accessLevel: 'view' },
    { id: '9', module: 'Training Management', feature: 'Courses', accessLevel: 'view' },
    // Finance & Reports
    { id: '10', module: 'Finance & Reports', feature: 'Finance', accessLevel: 'view' },
    { id: '11', module: 'Finance & Reports', feature: 'Reports', accessLevel: 'view' },
    // System
    { id: '12', module: 'System', feature: 'Permissions', accessLevel: 'none' },
    { id: '13', module: 'System', feature: 'Settings', accessLevel: 'view' },
  ]
};

const MOCK_TEACHERS: Teacher[] = [
  { id: '1', name: 'Mr. Smith', email: 'smith@englishhub.com', phone: '0901112223', specialization: 'IELTS, TOEFL', status: 'Active', joinDate: '2022-05-10' },
  { id: '2', name: 'Ms. Jane', email: 'jane@englishhub.com', phone: '0902223334', specialization: 'TOEIC, Communication', status: 'Active', joinDate: '2023-01-15' },
  { id: '3', name: 'Ms. Anna', email: 'anna@englishhub.com', phone: '0903334445', specialization: 'English for Kids', status: 'Active', joinDate: '2023-06-20' },
  { id: '4', name: 'Mr. David', email: 'david@englishhub.com', phone: '0904445556', specialization: 'Business English', status: 'Active', joinDate: '2022-11-05' },
];

const MOCK_CONTRACTS: Contract[] = [
  { 
    id: '1', 
    contractNumber: 'HD-2024-001', 
    type: 'Combo', 
    totalFee: 25000000, 
    paidAmount: 25000000, 
    status: 'Signed', 
    date: '2024-01-15',
    discount: 2000000,
    transferAmount: 0,
    lateEntryDeduction: 0,
    courses: [
      { id: 'IELTS-STR', fee: 6000000 },
      { id: 'IELTS-FND', fee: 7000000 },
      { id: 'IELTS-INT', fee: 12000000 }
    ],
    paymentPeriods: [
      { id: 'p1', dueDate: '2024-01-15', amount: 12500000, status: 'Paid' },
      { id: 'p2', dueDate: '2024-02-15', amount: 12500000, status: 'Paid' }
    ],
    history: [
      { id: 'h1', updateTime: '2024-01-15 09:00', updatedBy: 'Admin', action: 'Tạo hợp đồng', details: 'Hợp đồng được tạo mới' },
      { id: 'h2', updateTime: '2024-01-15 10:30', updatedBy: 'Staff A', action: 'Cập nhật thanh toán', details: 'Thanh toán kỳ 1: 12.500.000đ' }
    ]
  },
  { 
    id: '2', 
    contractNumber: 'HD-2024-042', 
    type: 'Single', 
    totalFee: 8500000, 
    paidAmount: 4000000, 
    status: 'Pending', 
    date: '2024-03-10',
    discount: 500000,
    transferAmount: 1000000,
    lateEntryDeduction: 0,
    courses: [
      { id: 'IELTS-STR', fee: 8500000 }
    ],
    paymentPeriods: [
      { id: 'p3', dueDate: '2024-03-10', amount: 4000000, status: 'Paid' },
      { id: 'p4', dueDate: '2024-03-14', amount: 4500000, status: 'Overdue' }
    ],
    history: [
      { id: 'h3', updateTime: '2024-03-10 14:00', updatedBy: 'Staff B', action: 'Tạo hợp đồng', details: 'Hợp đồng khóa lẻ IELTS Starter' }
    ]
  },
];

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'vana@gmail.com', phone: '0901234567', course: 'IELTS Intensive', status: 'Official', joinDate: '2023-10-15' },
  { id: '2', name: 'Trần Thị B', email: 'thib@gmail.com', phone: '0912345678', course: 'IELTS Intensive', status: 'Official', joinDate: '2023-11-02' },
  { id: '3', name: 'Lê Văn C', email: 'vanc@gmail.com', phone: '0923456789', course: 'IELTS Intensive', status: 'Trial', joinDate: '2023-08-20' },
  { id: '4', name: 'Phạm Minh D', email: 'minhd@gmail.com', phone: '0934567890', course: 'IELTS Intensive', status: 'Official', joinDate: '2024-01-10' },
  { id: '5', name: 'Hoàng Thị E', email: 'thie@gmail.com', phone: '0945678901', course: 'IELTS Intensive', status: 'Official', joinDate: '2023-12-05' },
  { id: '6', name: 'Đặng Văn F', email: 'vanf@gmail.com', phone: '0956789012', course: 'IELTS Intensive', status: 'Trial', joinDate: '2024-02-14' },
  { id: '7', name: 'Vũ Thị G', email: 'thig@gmail.com', phone: '0967890123', course: 'IELTS Intensive', status: 'Official', joinDate: '2024-01-20' },
  { id: '8', name: 'Bùi Văn H', email: 'vanh@gmail.com', phone: '0978901234', course: 'IELTS Intensive', status: 'Official', joinDate: '2024-02-01' },
  { id: '9', name: 'Lý Thị I', email: 'thii@gmail.com', phone: '0989012345', course: 'IELTS Intensive', status: 'Trial', joinDate: '2024-02-10' },
  { id: '10', name: 'Đỗ Văn K', email: 'vank@gmail.com', phone: '0990123456', course: 'IELTS Intensive', status: 'Official', joinDate: '2024-02-15' },
  { id: '11', name: 'Trần Văn L', email: 'vanl@gmail.com', phone: '0881234567', course: 'IELTS Foundation', status: 'Official', joinDate: '2024-03-01' },
  { id: '12', name: 'Lê Thị M', email: 'thim@gmail.com', phone: '0882345678', course: 'IELTS Foundation', status: 'Trial', joinDate: '2024-03-05' },
  { id: '13', name: 'Phạm Văn N', email: 'vann@gmail.com', phone: '0883456789', course: 'IELTS Starter', status: 'Official', joinDate: '2024-03-10' },
  { id: '14', name: 'Hoàng Thị O', email: 'thio@gmail.com', phone: '0884567890', course: 'IELTS Starter', status: 'Official', joinDate: '2024-03-15' },
  { id: '15', name: 'Ngô Văn P', email: 'vanp@gmail.com', phone: '0885678901', course: 'IELTS Intensive', status: 'Trial', joinDate: '2024-03-20' },
];

const MOCK_CLASSES: Class[] = [
  { 
    id: 'c1', 
    name: 'IELTS-INT-01', 
    course: 'IELTS Intensive', 
    teacher: 'Mr. Smith', 
    schedule: 'Thứ 2, 4, 6', 
    time: '18:00 - 20:00', 
    startDate: '2024-03-01', 
    endDate: '2024-06-01', 
    room: 'P.101', 
    status: 'OnGoing', 
    studentCount: 10, 
    currentLesson: 5, 
    totalLessons: 32, 
    level: '5.0 - 6.5',
    scStaff: 'Ms. Lan Anh',
    weeklySchedule: [
      { day: 'Tue', time: '10:00 - 12:00' },
      { day: 'Thu', time: '11:00 - 13:00' },
      { day: 'Sat', time: '11:00 - 13:00' }
    ],
    courseBook: 'Time Zones 1, Third Edition. National Geographic Learning. Cengage Learning.',
    supplementaryMaterials: [
      { 
        category: 'Pronunciation', 
        items: [
          { label: "Tim's Pronunciation Workshop", link: 'https://www.bbc.co.uk/learningenglish/english/features/pronunciation' },
          { label: 'Baker, A. (2006). Ship or Sheep? An intermediate pronunciation course. Cambridge University Press.' }
        ] 
      },
      { 
        category: 'Vocabulary', 
        items: [{ label: 'Essential English Vocabulary' }] 
      },
      { 
        category: 'Grammar', 
        items: [{ label: 'English Grammar in Use' }] 
      },
      { 
        category: 'Videos', 
        items: [{ label: 'National Geographic Learning', link: 'https://eltngl.com/' }] 
      }
    ],
    learningOutcomes: [
      { skill: 'L', target: '>= 9/15' },
      { skill: 'R', target: '>= 6/10' },
      { skill: 'W', target: '>= 12/20' },
      { skill: 'S', target: '>= 9/15' },
      { skill: 'V&G', target: '>= 9/15' }
    ]
  },
  { id: 'c2', name: 'TOEIC-650-05', course: 'TOEIC 650+', teacher: 'Ms. Jane', schedule: 'Thứ 3, 5, 7', time: '19:30 - 21:30', startDate: '2024-03-15', endDate: '2024-05-15', room: 'P.202', status: 'PreOpening', studentCount: 12, currentLesson: 0, totalLessons: 24, level: '650+' },
  { id: 'c3', name: 'KIDS-ENG-02', course: 'English for Kids', teacher: 'Ms. Anna', schedule: 'Thứ 7, CN', time: '08:00 - 10:00', startDate: '2024-01-10', endDate: '2024-04-10', room: 'P.105', status: 'OnGoing', studentCount: 10, currentLesson: 18, totalLessons: 24, level: 'Beginner' },
  { id: 'c4', name: 'BIZ-ENG-01', course: 'Business English', teacher: 'Mr. David', schedule: 'Thứ 2, 4', time: '18:30 - 20:30', startDate: '2024-02-01', endDate: '2024-05-01', room: 'P.303', status: 'Stopped', studentCount: 8, currentLesson: 5, totalLessons: 20, level: 'Intermediate' },
];

const COURSE_DATA: Record<string, string[]> = {
  'IELTS Intensive': ['IE1', 'IE2', 'IE3'],
  'TOEIC 650+': ['TO1', 'TO2'],
  'English for Kids': ['EK1', 'EK2', 'EK3'],
  'Business English': ['BE1', 'BE2'],
  'IELTS Foundation': ['IF1', 'IF2'],
  'Communication Plus': ['CP1', 'CP2']
};

interface CashInRecord {
  id: string;
  studentName: string;
  contractId: string;
  fee: number;
  paymentDate: string;
  installment: string;
  staffId: string;
  note: string;
  type: 'NS' | 'Re' | 'PC';
}

const MOCK_CASH_IN: CashInRecord[] = [
  { id: '1', studentName: 'Nguyễn Văn A', contractId: 'CT-001', fee: 5000000, paymentDate: '2024-03-01', installment: 'Kỳ 1', staffId: 'ST001', note: '-', type: 'NS' },
  { id: '2', studentName: 'Trần B', contractId: 'CT-002', fee: 3000000, paymentDate: '2024-03-05', installment: 'Kỳ 2', staffId: 'ST002', note: '-', type: 'Re' },
  { id: '3', studentName: 'Lê C', contractId: 'CT-003', fee: 10000000, paymentDate: '2024-03-10', installment: 'Kỳ 3', staffId: 'ST001', note: '-', type: 'PC' },
  { id: '4', studentName: 'Phạm D', contractId: 'CT-004', fee: 7500000, paymentDate: '2024-03-12', installment: 'Kỳ 1', staffId: 'ST003', note: 'Đóng đủ', type: 'NS' },
  { id: '5', studentName: 'Hoàng E', contractId: 'CT-005', fee: 4500000, paymentDate: '2024-03-15', installment: 'Kỳ 2', staffId: 'ST002', note: '-', type: 'Re' },
];

const FinanceView = () => {
  const [activeTab, setActiveTab] = useState<'cash-in' | 'revenue'>('cash-in');
  const [dateRange, setDateRange] = useState({ start: '2024-03-01', end: '2024-03-31' });
  const [selectedStaff, setSelectedStaff] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [financeSearchQuery, setFinanceSearchQuery] = useState('');
  
  // Revenue specific states
  const [revenueViewMode, setRevenueViewMode] = useState<'monthly' | 'hourly'>('monthly');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [revenueFilters, setRevenueFilters] = useState({
    course: 'All',
    level: 'All',
    class: 'All'
  });

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedRows(newExpanded);
  };

  const filteredCashIn = MOCK_CASH_IN.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(financeSearchQuery.toLowerCase()) || 
                         record.contractId.toLowerCase().includes(financeSearchQuery.toLowerCase());
    const matchesStaff = selectedStaff === 'All' || record.staffId === selectedStaff;
    const matchesType = selectedType === 'All' || record.type === selectedType;
    return matchesSearch && matchesStaff && matchesType;
  });

  const totalCashIn = filteredCashIn.reduce((sum, record) => sum + record.fee, 0);

  const typeSummary = filteredCashIn.reduce((acc, record) => {
    if (!acc[record.type]) {
      acc[record.type] = { total: 0, count: 0 };
    }
    acc[record.type].total += record.fee;
    acc[record.type].count += 1;
    return acc;
  }, {} as Record<string, { total: number, count: number }>);

  const staffInfo: Record<string, { color: string, name: string }> = {
    'ST001': { color: 'blue', name: 'Admin' },
    'ST002': { color: 'purple', name: 'Staff A' },
    'ST003': { color: 'orange', name: 'Staff B' },
  };

  // Mock Revenue Data for Tree Table
  const REVENUE_DATA = [
    {
      id: 'course-1',
      name: 'IELTS Intensive',
      type: 'course',
      revenue: 450000000,
      totalHours: 1200,
      revenuePerHour: 375000,
      children: [
        {
          id: 'level-1-1',
          name: 'Level 5.0 - 6.5',
          type: 'level',
          revenue: 250000000,
          totalHours: 600,
          revenuePerHour: 416666,
          children: [
            {
              id: 'class-1-1-1',
              name: 'IELTS-INT-01',
              type: 'class',
              revenue: 120000000,
              totalHours: 280,
              revenuePerHour: 428571,
              children: [
                { id: 'student-1-1-1-1', name: 'Nguyễn Văn A', type: 'student', revenue: 25000000, totalHours: 60, revenuePerHour: 416666 },
                { id: 'student-1-1-1-2', name: 'Trần Thị B', type: 'student', revenue: 25000000, totalHours: 60, revenuePerHour: 416666 },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'course-2',
      name: 'TOEIC 650+',
      type: 'course',
      revenue: 180000000,
      totalHours: 800,
      revenuePerHour: 225000,
      children: []
    }
  ];

  const renderRevenueRow = (node: any, level: number = 0) => {
    const isExpanded = expandedRows.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <React.Fragment key={node.id}>
        <tr className={`hover:bg-slate-50 transition-colors border-b border-slate-100 ${level === 0 ? 'bg-white font-bold' : 'bg-transparent'}`}>
          <td className="px-6 py-4" style={{ paddingLeft: `${level * 24 + 24}px` }}>
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button onClick={() => toggleRow(node.id)} className="p-1 hover:bg-slate-200 rounded transition-colors">
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              {!hasChildren && level > 0 && <div className="w-6" />}
              <span className={`text-sm ${node.type === 'student' ? 'text-slate-600 font-medium' : 'text-slate-900'}`}>
                {node.name}
              </span>
              {node.type === 'course' && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded uppercase font-bold">Course</span>}
              {node.type === 'level' && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase font-bold">Level</span>}
              {node.type === 'class' && <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded uppercase font-bold">Class</span>}
            </div>
          </td>
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-bold text-slate-900">{node.revenue.toLocaleString('vi-VN')} đ</span>
          </td>
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-medium text-indigo-600">{node.revenuePerHour.toLocaleString('vi-VN')} đ</span>
          </td>
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-medium text-slate-600">{node.totalHours}h</span>
          </td>
        </tr>
        {isExpanded && node.children && node.children.map((child: any) => renderRevenueRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('cash-in')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'cash-in' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Cash In
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'revenue' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Revenue
        </button>
      </div>

      {activeTab === 'cash-in' ? (
        <div className="space-y-6">
          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Total Cash In</p>
                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                  <DollarSign size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {totalCashIn.toLocaleString('vi-VN')} <span className="text-sm font-bold">VND</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium italic">{filteredCashIn.length} transactions</p>
              </div>
            </div>

            {/* NS Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">NS (New Sale)</p>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Plus size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">
                  {(typeSummary['NS']?.total || 0).toLocaleString('vi-VN')} <span className="text-sm font-bold">VND</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium italic">
                  {typeSummary['NS']?.count || 0} transactions
                </p>
              </div>
            </div>

            {/* Re Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">Re (Re-enroll)</p>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <History size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {(typeSummary['Re']?.total || 0).toLocaleString('vi-VN')} <span className="text-sm font-bold">VND</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium italic">
                  {typeSummary['Re']?.count || 0} transactions
                </p>
              </div>
            </div>

            {/* PC Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500">PC (Completed)</p>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Check size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-600">
                  {(typeSummary['PC']?.total || 0).toLocaleString('vi-VN')} <span className="text-sm font-bold">VND</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium italic">
                  {typeSummary['PC']?.count || 0} transactions
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm theo học viên / contract ID..." 
                  value={financeSearchQuery}
                  onChange={(e) => setFinanceSearchQuery(e.target.value)}
                  className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-slate-400">—</span>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Types</option>
                <option value="NS">NS</option>
                <option value="Re">Re</option>
                <option value="PC">PC</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter Staff</label>
              <select 
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-48 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Staff</option>
                <option value="ST001">ST001 - Admin</option>
                <option value="ST002">ST002 - Staff A</option>
                <option value="ST003">ST003 - Staff B</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#303B70] text-white">
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider">Student Name</th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider">Contract ID</th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-right">Fee</th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider">Payment Date</th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider">Installment</th>
                  {Object.values(staffInfo).map(staff => (
                    <th key={staff.name} className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-right">{staff.name}</th>
                  ))}
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider">Note</th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-center">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Summary Row */}
                <tr className="bg-indigo-50/50 font-bold border-b-2 border-indigo-100">
                  <td className="px-4 py-4 text-xs text-indigo-900 uppercase tracking-wider" colSpan={2}>Total Summary</td>
                  <td className="px-4 py-4 text-right text-xs text-indigo-900">
                    {totalCashIn.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="px-4 py-4" colSpan={2}></td>
                  {Object.entries(staffInfo).map(([id, info]) => {
                    const staffTotal = filteredCashIn
                      .filter(r => r.staffId === id)
                      .reduce((sum, r) => sum + r.fee, 0);
                    return (
                      <td key={id} className="px-4 py-4 text-right text-xs text-indigo-900">
                        {staffTotal > 0 ? `${staffTotal.toLocaleString('vi-VN')} VND` : '-'}
                      </td>
                    );
                  })}
                  <td className="px-4 py-4" colSpan={2}></td>
                </tr>

                {filteredCashIn.map((record) => (
                  <tr key={record.id} className="hover:bg-indigo-50/30 transition-colors group cursor-default">
                    <td className="px-4 py-4">
                      <p className="text-xs font-bold text-slate-900">{record.studentName}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-indigo-600">{record.contractId}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-xs font-black text-slate-900">{record.fee.toLocaleString('vi-VN')} VND</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">{record.paymentDate}</td>
                    <td className="px-4 py-4 text-xs text-slate-600 font-medium">{record.installment}</td>
                    {Object.entries(staffInfo).map(([id, info]) => (
                      <td 
                        key={id} 
                        className={`px-4 py-4 text-right text-xs font-bold cursor-pointer hover:text-indigo-600 transition-colors ${record.staffId === id ? 'text-slate-900' : 'text-slate-300'}`}
                        onClick={() => setSelectedStaff(id)}
                      >
                        {record.staffId === id ? `${record.fee.toLocaleString('vi-VN')} VND` : '-'}
                      </td>
                    ))}
                    <td className="px-4 py-4 text-xs text-slate-400 italic">{record.note}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black tracking-wider ${
                        record.type === 'NS' ? 'bg-green-100 text-green-700' :
                        record.type === 'Re' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {record.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filters Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search revenue..." 
                    className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="date" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" defaultValue="2024-03-01" />
                  <span className="text-slate-400">—</span>
                  <input type="date" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" defaultValue="2024-03-31" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Course</label>
                <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                  <option>All Courses</option>
                  <option>IELTS Intensive</option>
                  <option>TOEIC 650+</option>
                </select>
              </div>

              <div className="flex flex-col justify-end h-full pt-6">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setRevenueViewMode('monthly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${revenueViewMode === 'monthly' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setRevenueViewMode('hourly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${revenueViewMode === 'hourly' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Hourly
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue (Month)', value: '630,000,000 đ', icon: DollarSign, color: 'indigo', tooltip: 'Tổng doanh thu ghi nhận trong tháng' },
              { label: 'Revenue per Hour (Avg)', value: '315,000 đ', icon: Clock, color: 'emerald', tooltip: 'Doanh thu trung bình trên mỗi giờ dạy (Revenue / Total Hours)' },
              { label: 'Total Teaching Hours', value: '2,000h', icon: GraduationCap, color: 'amber', tooltip: 'Tổng số giờ giảng dạy thực tế' },
              { label: 'Total Students', value: '156', icon: Users, color: 'rose', tooltip: 'Tổng số học viên có phát sinh doanh thu' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600`}>
                    <kpi.icon size={24} />
                  </div>
                  <div className="relative group/tooltip">
                    <Info size={16} className="text-slate-300 cursor-help" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20">
                      {kpi.tooltip}
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</p>
                <h3 className="text-xl font-black text-slate-900 mt-1">{kpi.value}</h3>
              </div>
            ))}
          </div>

          {/* Revenue Breakdown Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Revenue Breakdown</h3>
              <span className="text-xs text-slate-400 font-medium italic">Click to expand rows for details</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Breakdown (Course / Level / Class / Student)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Revenue (Month)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Revenue per Hour</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_DATA.map(node => renderRevenueRow(node))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const PermissionManagementView = () => {
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [permissionData, setPermissionData] = useState<Record<string, Permission[]>>(MOCK_PERMISSIONS);
    const [roleSearchQuery, setRoleSearchQuery] = useState('');
    const [expandedModules, setExpandedModules] = useState<string[]>(['Student Management', 'Teacher Management', 'Training Management', 'Finance & Reports', 'System']);

    const roles = Object.keys(permissionData);
    const currentPermissions = permissionData[selectedRole] || [];

    const toggleModule = (module: string) => {
      setExpandedModules(prev => 
        prev.includes(module) ? prev.filter(m => m !== module) : [...prev, module]
      );
    };

    const handlePermissionChange = (id: string, level: AccessLevel) => {
      setPermissionData(prev => ({
        ...prev,
        [selectedRole]: prev[selectedRole].map(p => 
          p.id === id ? { ...p, accessLevel: level } : p
        )
      }));
    };

    const handleSetAllModule = (module: string, level: AccessLevel) => {
      setPermissionData(prev => ({
        ...prev,
        [selectedRole]: prev[selectedRole].map(p => 
          p.module === module ? { ...p, accessLevel: level } : p
        )
      }));
    };

    const filteredPermissions = currentPermissions.filter(p => 
      p.feature.toLowerCase().includes(roleSearchQuery.toLowerCase()) ||
      p.module.toLowerCase().includes(roleSearchQuery.toLowerCase())
    );

    const grouped = filteredPermissions.reduce((acc, curr) => {
      if (!acc[curr.module]) acc[curr.module] = [];
      acc[curr.module].push(curr);
      return acc;
    }, {} as Record<string, Permission[]>);

    const getAccessColor = (level: AccessLevel) => {
      switch (level) {
        case 'none': return 'text-slate-400 bg-slate-50 border-slate-200';
        case 'view': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
        case 'full': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        default: return 'text-slate-400 bg-slate-50 border-slate-200';
      }
    };

    const getAccessLabel = (level: AccessLevel) => {
      switch (level) {
        case 'none': return 'No Access';
        case 'view': return 'View Only';
        case 'full': return 'Full Access';
        default: return 'No Access';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={28} />
              Quản lý phân quyền
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium italic">Thiết lập quyền truy cập cho từng chức năng theo vai trò người dùng.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm tính năng..." 
                value={roleSearchQuery}
                onChange={(e) => setRoleSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Save size={18} />
              Lưu cấu hình
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px]">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Chọn vai trò:</label>
              <div className="flex p-1 bg-slate-200 rounded-xl">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-6 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedRole === role ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> No Access</span>
               <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div> View Only</span>
               <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div> Full Access</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50/80 border-b-2 border-slate-300 select-none">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest w-[40%]">Feature</th>
                  <th className="px-4 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center whitespace-nowrap">No Access</th>
                  <th className="px-4 py-5 text-[11px] font-black text-indigo-600/70 uppercase tracking-widest text-center whitespace-nowrap">View</th>
                  <th className="px-4 py-5 text-[11px] font-black text-emerald-600/70 uppercase tracking-widest text-center whitespace-nowrap">Full</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(Object.entries(grouped) as [string, Permission[]][]).map(([module, features]) => (
                  <React.Fragment key={module}>
                    {/* Module Header Row */}
                    <tr className="bg-slate-50 border-y-2 border-slate-200 group cursor-pointer hover:bg-indigo-50/50 transition-colors" onClick={() => toggleModule(module)}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-tight">
                          {expandedModules.includes(module) ? <ChevronDown size={20} className="text-indigo-600" /> : <ChevronRight size={20} className="text-indigo-600" />}
                          {module}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => handleSetAllModule(module, 'none')}
                          className="text-[9px] font-black text-slate-500 hover:text-slate-700 uppercase tracking-tighter bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
                        >
                          None All
                        </button>
                      </td>
                      <td className="px-4 py-5 text-center" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => handleSetAllModule(module, 'view')}
                          className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-tighter bg-white border border-indigo-300 px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
                        >
                          View All
                        </button>
                      </td>
                      <td className="px-4 py-5 text-center" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => handleSetAllModule(module, 'full')}
                          className="text-[9px] font-black text-emerald-600 hover:text-emerald-800 uppercase tracking-tighter bg-white border border-emerald-300 px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
                        >
                          Full All
                        </button>
                      </td>
                      <td className="px-8 py-5"></td>
                    </tr>
                    
                    {/* Feature Rows */}
                    {expandedModules.includes(module) && features.map((feature) => (
                      <tr 
                        key={feature.id}
                        className="group hover:bg-slate-50/50 transition-all border-b border-slate-200"
                      >
                        <td className="pl-16 px-8 py-5">
                          <p className="text-[13px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{feature.feature}</p>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handlePermissionChange(feature.id, 'none')}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                feature.accessLevel === 'none' 
                                ? 'bg-slate-500 border-slate-500 shadow-lg shadow-slate-100 scale-110' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {feature.accessLevel === 'none' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handlePermissionChange(feature.id, 'view')}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                feature.accessLevel === 'view' 
                                ? 'bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-100 scale-110' 
                                : 'bg-white border-slate-200 hover:border-indigo-200'
                              }`}
                            >
                              {feature.accessLevel === 'view' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handlePermissionChange(feature.id, 'full')}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                feature.accessLevel === 'full' 
                                ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100 scale-110' 
                                : 'bg-white border-slate-200 hover:border-emerald-200'
                              }`}
                            >
                              {feature.accessLevel === 'full' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </button>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${getAccessColor(feature.accessLevel)}`}>
                            {getAccessLabel(feature.accessLevel)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {Object.keys(grouped).length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <Lock size={32} />
               </div>
               <p className="font-bold uppercase tracking-widest text-xs">Không tìm thấy tính năng</p>
               <p className="text-[10px] mt-1 font-medium italic">Vui lòng kiểm tra lại từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('students');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract);
    setActiveView('contract-detail');
  };

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NavItem = ({ id, icon: Icon, label }: { id: ViewType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeView === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setActiveView('student-detail');
  };

  const handleClassClick = (cls: Class) => {
    setSelectedClass(cls);
    setActiveView('class-detail');
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveView('teacher-detail');
  };

  const TeacherDetailView = ({ teacher, onBack }: { teacher: Teacher; onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState('info');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white rounded-xl border border-slate-200 text-slate-500 transition-all shadow-sm"
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-200">
                {teacher.name.split(' ').pop()?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{teacher.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Mail size={14} /> {teacher.email}
                  </span>
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Phone size={14} /> {teacher.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-colors">
              Chỉnh sửa
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl w-fit">
          {[
            { id: 'info', label: 'Teacher Info' },
            { id: 'timesheet', label: 'Teacher Timesheet' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
          {activeTab === 'info' ? (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Thông tin cá nhân</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Họ và tên</p>
                    <p className="text-sm font-bold text-slate-700">{teacher.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-slate-700">{teacher.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Số điện thoại</p>
                    <p className="text-sm font-bold text-slate-700">{teacher.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày tham gia</p>
                    <p className="text-sm font-bold text-slate-700">{teacher.joinDate}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Chuyên môn & Trạng thái</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chuyên môn</p>
                    <p className="text-sm font-bold text-slate-700">{teacher.specialization}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trạng thái</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {teacher.status === 'Active' ? 'Đang làm việc' : 'Nghỉ việc'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <TeacherTimesheet teacher={teacher} />
          )}
        </div>
      </motion.div>
    );
  };

  const TeacherTimesheet = ({ teacher }: { teacher: Teacher }) => {
    const [selectedWeek, setSelectedWeek] = useState('03 thg 9');
    const [dateRange, setDateRange] = useState({ start: '2024-09-01', end: '2024-09-30' });
    const [note, setNote] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newAdminHour, setNewAdminHour] = useState({ title: 'Admin Hour', startTime: '09:00', endTime: '11:00', day: 0 });
    
    // Mock events
    // Note: In a real scenario, 'deadline' events would be auto-generated 
    // by checking if there was a test 6 days ago for any of the teacher's classes.
    const [events, setEvents] = useState([
      { id: '1', type: 'teaching', classId: 'IELTS-INT-01', skill: 'L&R', startTime: '09:00', endTime: '11:00', day: 0 }, // Mon
      { id: '2', type: 'admin', title: 'Admin Hour', startTime: '13:00', endTime: '15:00', day: 1 }, // Tue
      { id: '3', type: 'deadline', title: 'Deadline Comment', className: 'IELTS-INT-01', startTime: '10:00', endTime: '11:00', day: 3 }, // Thu
    ]);

    const timeSlots = [];
    for (let h = 7; h <= 22; h++) {
      timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
    }

    const days = [
      { id: 0, label: 'Monday' },
      { id: 1, label: 'Tuesday' },
      { id: 2, label: 'Wednesday' },
      { id: 3, label: 'Thursday' },
      { id: 4, label: 'Friday' },
      { id: 5, label: 'Saturday' },
      { id: 6, label: 'Sunday' }
    ];

    const getWeekDates = (weekStr: string) => {
      // Mock date parsing for '03 thg 9' or '10 thg 9'
      const day = parseInt(weekStr.split(' ')[0]);
      const month = 8; // September (0-indexed)
      const year = 2024;
      const startDate = new Date(year, month, day);
      
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return {
          formatted: `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`,
          dayName: days[i].label
        };
      });
    };

    const weekDates = getWeekDates(selectedWeek);

    const calculateDuration = (start: string, end: string) => {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      return (eh * 60 + em) - (sh * 60 + sm);
    };

    const adminHours = events
      .filter(e => e.type === 'admin')
      .reduce((acc, e) => acc + calculateDuration(e.startTime, e.endTime) / 60, 0);

    const teachingHours = events
      .filter(e => e.type === 'teaching')
      .reduce((acc, e) => acc + calculateDuration(e.startTime, e.endTime) / 60, 0);

    const handleAddAdminHour = (dayIndex: number, time: string) => {
      const [h, m] = time.split(':').map(Number);
      const endH = h + 2 > 22 ? 22 : h + 2;
      const endTime = `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      setNewAdminHour({ title: 'Admin Hour', startTime: time, endTime, day: dayIndex });
      setIsAddModalOpen(true);
    };

    const saveAdminHour = () => {
      // Validation: No overlap with teaching hours
      const hasOverlap = events.some(e => 
        e.day === newAdminHour.day && 
        e.type === 'teaching' && 
        ((newAdminHour.startTime >= e.startTime && newAdminHour.startTime < e.endTime) ||
         (newAdminHour.endTime > e.startTime && newAdminHour.endTime <= e.endTime))
      );

      if (hasOverlap) {
        alert('Admin hour overlaps with a teaching hour!');
        return;
      }

      setEvents([...events, { 
        id: Date.now().toString(), 
        type: 'admin', 
        title: newAdminHour.title, 
        startTime: newAdminHour.startTime, 
        endTime: newAdminHour.endTime, 
        day: newAdminHour.day 
      }]);
      setIsAddModalOpen(false);
    };

    const [filterType, setFilterType] = useState('Week');

    return (
      <div className="flex flex-col h-full">
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase">Lọc theo</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Week">Tuần</option>
                <option value="Month">Tháng</option>
                <option value="Quarter">Quý</option>
                <option value="Year">Năm</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase">Tuần</label>
              <select 
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="03 thg 9">03 thg 9</option>
                <option value="10 thg 9">10 thg 9</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase">Khoảng ngày</label>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-slate-400">-</span>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Admin Hours</p>
                <p className="text-lg font-black text-indigo-600">{adminHours}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Teaching Hours</p>
                <p className="text-lg font-black text-emerald-600">{teachingHours}</p>
              </div>
            </div>
            <div className="w-48">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ghi chú</p>
              <input 
                type="text" 
                placeholder="Thêm ghi chú..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto relative">
          <div className="min-w-[1000px]">
            {/* Day Headers */}
            <div className="flex sticky top-0 z-20 bg-white border-b border-slate-200">
              <div className="w-20 shrink-0 bg-slate-50 border-r border-slate-200" />
              {weekDates.map((dateInfo, i) => (
                <div key={i} className="flex-1 py-2 text-center border-r border-slate-100 last:border-r-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-400 font-medium leading-tight">{dateInfo.formatted}</span>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{dateInfo.dayName}</span>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="flex relative">
              {/* Time Column */}
              <div className="w-20 shrink-0 bg-slate-50 border-r border-slate-200 sticky left-0 z-10">
                {timeSlots.map((time, i) => (
                  <div key={i} className="h-12 border-b border-slate-100 px-2 flex items-start justify-end">
                    <span className="text-[10px] font-bold text-slate-400 mt-1">{time}</span>
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              <div className="flex-1 flex relative">
                {days.map((_, dayIndex) => (
                  <div key={dayIndex} className="flex-1 border-r border-slate-100 last:border-r-0 relative">
                    {timeSlots.map((time, i) => (
                      <div 
                        key={i} 
                        className="h-12 border-b border-slate-50 cursor-pointer hover:bg-slate-50/50 transition-colors"
                        onClick={() => handleAddAdminHour(dayIndex, time)}
                      />
                    ))}

                    {/* Events for this day */}
                    {events.filter(e => e.day === dayIndex).map(event => {
                      const [sh, sm] = event.startTime.split(':').map(Number);
                      const [eh, em] = event.endTime.split(':').map(Number);
                      
                      // Only show events within 07:00 - 22:00
                      if (sh < 7 && eh <= 7) return null;
                      if (sh >= 22) return null;

                      const displayStartH = Math.max(sh, 7);
                      const displayEndH = Math.min(eh, 22);
                      const displayStartM = sh < 7 ? 0 : sm;
                      const displayEndM = eh > 22 ? 0 : em;

                      const top = (displayStartH - 7 + (displayStartM / 60)) * 48; // 48px per 1 hour slot
                      const height = ((displayEndH * 60 + displayEndM) - (displayStartH * 60 + displayStartM)) / 60 * 48;

                      return (
                        <div 
                          key={event.id}
                          className={`absolute left-1 right-1 rounded-lg p-2 shadow-sm z-10 overflow-hidden transition-transform hover:scale-[1.02] ${
                            event.type === 'teaching' ? 'bg-[#303B70] text-white' :
                            event.type === 'admin' ? 'bg-indigo-100 border border-indigo-200 text-indigo-700' :
                            'bg-red-600 text-white border-2 border-yellow-400'
                          }`}
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          {event.type === 'teaching' ? (
                            <div className="h-full flex flex-col justify-between">
                              <div>
                                <p className="text-[10px] font-black leading-tight">{event.classId}</p>
                                <p className="text-[10px] font-bold opacity-80">{event.skill}</p>
                              </div>
                              <p className="text-[10px] font-medium mt-auto">{event.startTime} - {event.endTime}</p>
                            </div>
                          ) : event.type === 'admin' ? (
                            <div className="h-full flex flex-col">
                              <p className="text-[10px] font-black leading-tight uppercase">{event.title}</p>
                              <p className="text-[10px] font-bold mt-auto">{event.startTime} - {event.endTime}</p>
                            </div>
                          ) : (
                            <div className="h-full flex flex-col">
                              <p className="text-[10px] font-black leading-tight uppercase text-yellow-300">Deadline Comment</p>
                              <p className="text-[10px] font-bold truncate">{event.className}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Admin Hour Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Add Admin Hour</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
                    <input 
                      type="text" 
                      value={newAdminHour.title}
                      onChange={(e) => setNewAdminHour({...newAdminHour, title: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Start Time</label>
                      <input 
                        type="time" 
                        value={newAdminHour.startTime}
                        onChange={(e) => setNewAdminHour({...newAdminHour, startTime: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">End Time</label>
                      <input 
                        type="time" 
                        value={newAdminHour.endTime}
                        onChange={(e) => setNewAdminHour({...newAdminHour, endTime: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveAdminHour}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const TeachersView = () => {
    const [teacherSearch, setTeacherSearch] = useState('');

    const filteredTeachers = MOCK_TEACHERS.filter(t => 
      t.name.toLowerCase().includes(teacherSearch.toLowerCase()) || 
      t.email.toLowerCase().includes(teacherSearch.toLowerCase())
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Danh sách giảng viên</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <Plus size={18} />
            Thêm giảng viên
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm giảng viên..." 
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Giảng viên</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Chuyên môn</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày tham gia</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((teacher) => (
                  <tr 
                    key={teacher.id} 
                    onClick={() => handleTeacherClick(teacher)}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {teacher.name.split(' ').pop()?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{teacher.name}</p>
                          <p className="text-xs text-slate-500">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 font-medium">{teacher.specialization}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{teacher.joinDate}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {teacher.status === 'Active' ? 'Đang làm việc' : 'Nghỉ việc'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  const ClassesView = () => {
    const [classSearch, setClassSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredClasses = MOCK_CLASSES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(classSearch.toLowerCase()) || 
                           c.teacher.toLowerCase().includes(classSearch.toLowerCase());
      const matchesCourse = courseFilter === 'All' || c.course === courseFilter;
      const matchesDate = !dateFilter || c.startDate >= dateFilter;
      return matchesSearch && matchesCourse && matchesDate;
    });

    const courses = Array.from(new Set(MOCK_CLASSES.map(c => c.course)));

    const CreateClassModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
      const [formData, setFormData] = useState({
        courseName: '',
        courseId: '',
        className: '',
        room: '',
        course: '',
        days: [] as string[],
        daySchedules: {} as Record<string, { startTime: string; endTime: string }>,
        scStaff: '',
        startDate: '',
        endDate: '',
        classType: 'Public',
        totalHours: '',
        courseDuration: '',
        lessonDuration: ''
      });

      const handleStartDateChange = (date: string) => {
        if (!date) {
          setFormData(prev => ({ ...prev, startDate: '', endDate: '' }));
          return;
        }
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 6); // Default 6 months
        const endDateStr = endDate.toISOString().split('T')[0];
        
        setFormData(prev => ({
          ...prev,
          startDate: date,
          endDate: endDateStr
        }));
      };

      const handleCourseNameChange = (name: string) => {
        setFormData(prev => ({
          ...prev,
          courseName: name,
          course: name,
          courseId: '',
          className: ''
        }));
      };

      const handleCourseIdChange = (id: string) => {
        const year = new Date().getFullYear().toString().slice(-2);
        const sequence = "001";
        const autoClassName = id ? `${id}_${year}_${sequence}` : '';
        
        setFormData(prev => ({
          ...prev,
          courseId: id,
          className: autoClassName
        }));
      };
      const daysOfWeek = [
        { id: 'mon', label: 'Thứ 2' },
        { id: 'tue', label: 'Thứ 3' },
        { id: 'wed', label: 'Thứ 4' },
        { id: 'thu', label: 'Thứ 5' },
        { id: 'fri', label: 'Thứ 6' },
        { id: 'sat', label: 'Thứ 7' },
        { id: 'sun', label: 'Chủ Nhật' },
      ];

      const availableSCStaff = ['Staff A', 'Staff B', 'Staff C', 'Admin'];

      const toggleDay = (day: string) => {
        setFormData(prev => {
          const isSelected = prev.days.includes(day);
          const newDays = isSelected 
            ? prev.days.filter(d => d !== day) 
            : [...prev.days, day];
          
          const newDaySchedules = { ...prev.daySchedules };
          if (isSelected) {
            delete newDaySchedules[day];
          } else {
            newDaySchedules[day] = { startTime: '18:00', endTime: '20:00' };
          }

          return {
            ...prev,
            days: newDays,
            daySchedules: newDaySchedules
          };
        });
      };

      const updateDayTime = (day: string, value: string) => {
        setFormData(prev => {
          const [hours, minutes] = value.split(':').map(Number);
          const endHours = (hours + 2) % 24;
          const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

          return {
            ...prev,
            daySchedules: {
              ...prev.daySchedules,
              [day]: {
                startTime: value,
                endTime: endTime
              }
            }
          };
        });
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Tạo lớp học mới</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Class Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Class Type</label>
                <select 
                  value={formData.classType}
                  onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                >
                  <option value="Public">Public</option>
                  <option value="Tutor">Tutor</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              {formData.classType !== 'Public' && (
                <div className="grid grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Total Hours</label>
                    <input 
                      type="number"
                      placeholder="Ví dụ: 40"
                      value={formData.totalHours}
                      onChange={(e) => setFormData({...formData, totalHours: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Course Duration</label>
                    <input 
                      type="text"
                      placeholder="Ví dụ: 3 months"
                      value={formData.courseDuration}
                      onChange={(e) => setFormData({...formData, courseDuration: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Lesson Duration (h)</label>
                    <input 
                      type="number"
                      step="0.5"
                      placeholder="Ví dụ: 1.5"
                      value={formData.lessonDuration}
                      onChange={(e) => setFormData({...formData, lessonDuration: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                {/* Course Name Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Course Name</label>
                  <select 
                    value={formData.courseName}
                    onChange={(e) => handleCourseNameChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn khóa học...</option>
                    {Object.keys(COURSE_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Course ID Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Course ID</label>
                  <select 
                    value={formData.courseId}
                    onChange={(e) => handleCourseIdChange(e.target.value)}
                    disabled={!formData.courseName}
                    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${!formData.courseName ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Chọn mã khóa học...</option>
                    {formData.courseName && COURSE_DATA[formData.courseName].map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Class Name */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tên lớp học</label>
                  <input 
                    type="text"
                    placeholder="Ví dụ: IE1_26_001"
                    value={formData.className}
                    onChange={(e) => setFormData({...formData, className: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phòng học (Room)</label>
                  <select 
                    value={formData.room}
                    onChange={(e) => setFormData({...formData, room: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn phòng học...</option>
                    <option value="Room 101">Room 101</option>
                    <option value="Room 102">Room 102</option>
                    <option value="Room 201">Room 201</option>
                    <option value="Room 202">Room 202</option>
                    <option value="Room 301">Room 301</option>
                  </select>
                </div>
              </div>

              {/* Schedule Selection */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day.id}
                        onClick={() => toggleDay(day.id)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                          formData.days.includes(day.id)
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Individual Day Time Selection */}
                {formData.days.length > 0 && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="space-y-3">
                      {formData.days.map(dayId => {
                        const dayLabel = daysOfWeek.find(d => d.id === dayId)?.label;
                        return (
                          <div key={dayId} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-sm font-bold text-slate-700 min-w-[80px]">{dayLabel}</span>
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <div className="relative">
                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                  type="time"
                                  value={formData.daySchedules[dayId]?.startTime || '18:00'}
                                  onChange={(e) => updateDayTime(dayId, e.target.value)}
                                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                              </div>
                              <div className="relative">
                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                  type="time"
                                  value={formData.daySchedules[dayId]?.endTime || '20:00'}
                                  disabled
                                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs outline-none cursor-not-allowed opacity-70"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Ngày bắt đầu</label>
                  <input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Ngày kết thúc</label>
                  <input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* SC Staff Selection */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">SC Staff (Sale Care)</label>
                <select 
                  value={formData.scStaff}
                  onChange={(e) => setFormData({...formData, scStaff: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Chọn nhân viên...</option>
                  {availableSCStaff.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => {
                  // Basic Validation
                  if (!formData.courseName || !formData.courseId || !formData.className) {
                    alert('Vui lòng điền đầy đủ thông tin khóa học và tên lớp!');
                    return;
                  }

                  if (formData.classType !== 'Public') {
                    if (!formData.totalHours || !formData.courseDuration || !formData.lessonDuration) {
                      alert('Vui lòng điền đầy đủ thông tin bổ sung cho lớp Tutor/VIP!');
                      return;
                    }
                  }

                  alert('Lớp học đã được tạo thành công!');
                  onClose();
                }}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Check size={18} />
                Lưu lớp học
              </button>
            </div>
          </motion.div>
        </div>
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Quản lý lớp học</h2>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            Tạo lớp học mới
          </button>
        </div>

        <CreateClassModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
        />

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm tên lớp, giảng viên..." 
              value={classSearch}
              onChange={(e) => setClassSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Tất cả khóa học</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" />
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setClassSearch('');
                setCourseFilter('All');
                setDateFilter('');
              }}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Class List Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">STT</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Class Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Teacher</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Schedule</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Students</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Lesson Progress</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredClasses.map((cls, index) => (
                  <tr 
                    key={cls.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5 text-xs text-slate-400 font-medium">
                      {index + 1 < 10 ? `CL00${index + 1}` : `CL0${index + 1}`}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{cls.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-medium">
                          {cls.course} {cls.level && `• ${cls.level}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                      {cls.teacher}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {cls.schedule.split(', ').map((day, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                            {day}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 text-center font-medium">
                      <span className="text-slate-900">{cls.studentCount}</span>
                      <span className="text-slate-400">/15</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-slate-700">
                          {cls.currentLesson}/{cls.totalLessons}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          ({Math.round((cls.currentLesson / cls.totalLessons) * 100)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-4 py-1 rounded-full text-[11px] font-bold ${
                        cls.status === 'OnGoing' ? 'bg-emerald-50 text-emerald-500' :
                        cls.status === 'PreOpening' ? 'bg-amber-50 text-amber-500' :
                        'bg-rose-50 text-rose-500'
                      }`}>
                        {cls.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleClassClick(cls)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClasses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      Không tìm thấy lớp học nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-50">
            <p className="text-[10px] text-slate-400 italic font-medium">(Current/Max)</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const LessonDetailView = ({ lesson, onBack }: { lesson: any; onBack: () => void }) => {
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('10:00');
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [lessonNote, setLessonNote] = useState('');
    
    // Mock students for the class
    const classStudents = [
      { id: 'STU001', name: 'Phạm Quốc Cường' },
      { id: 'STU002', name: 'Việt Hà (F)' },
      { id: 'STU003', name: 'Tuấn Anh' },
      { id: 'STU004', name: 'Thành' },
      { id: 'STU005', name: 'Lân' },
    ];

    const [attendanceData, setAttendanceData] = useState<Record<string, any>>(
      classStudents.reduce((acc, student) => ({
        ...acc,
        [student.id]: { attendance: '', homework: '', attitude: 'Good', note: '' }
      }), {})
    );

    const [examData, setExamData] = useState<Record<string, any>>(
      classStudents.reduce((acc, student) => ({
        ...acc,
        [student.id]: { 
          listening: '', 
          reading: '', 
          writing: '', 
          speaking: '', 
          grammarVocab: '',
          total: '',
          note: '',
          status: '' 
        }
      }), {})
    );

    const isMidterm = lesson.unit === "Midterm test";

    const parseTime = (timeStr: string) => {
      if (!timeStr) return 0;
      const clean = timeStr.replace(/\s/g, '');
      const parts = clean.split(':');
      const hours = Number(parts[0]);
      const minutes = parts.length > 1 ? Number(parts[1]) : 0;
      return hours * 60 + (isNaN(minutes) ? 0 : minutes);
    };

    const getScheduledTimes = (duration: string) => {
      if (!duration) return { start: 0, end: 0 };
      const parts = duration.split('-').map(p => p.trim());
      if (parts.length < 2) return { start: 0, end: 0 };
      
      const formatPart = (p: string) => p.includes(':') ? p : `${p}:00`;
      
      return {
        start: parseTime(formatPart(parts[0])),
        end: parseTime(formatPart(parts[1]))
      };
    };

    const scheduled = getScheduledTimes(lesson.duration);
    const actualStart = parseTime(startTime);
    const actualEnd = parseTime(endTime);

    const timeDeviates = Math.abs(actualStart - scheduled.start) > 30 || Math.abs(actualEnd - scheduled.end) > 30;
    
    const missingData = !isMidterm && classStudents.some(student => {
      const data = attendanceData[student.id];
      return !data.homework || !data.attitude;
    });

    const isTableComplete = isMidterm 
      ? classStudents.every(student => {
          const data = examData[student.id];
          return data.status !== '';
        })
      : classStudents.every(student => {
          const data = attendanceData[student.id];
          return data.attendance && data.homework && data.attitude;
        });

    const handleAttendanceChange = (studentId: string, field: string, value: string) => {
      setAttendanceData(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], [field]: value }
      }));
    };

    const handleExamChange = (studentId: string, field: string, value: any) => {
      setExamData(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], [field]: value }
      }));
    };

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-600"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">Lesson Detail: Lesson {lesson.noLessons}</h2>
              {isStarted && !isEnded && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 border border-emerald-200">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Lesson Started
                </span>
              )}
              {isEnded && (
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 border border-slate-200">
                  <Check size={12} />
                  Lesson Ended
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Topic Button */}
        <div className="flex justify-start">
          <button 
            onClick={() => setIsTopicModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm"
          >
            <BookOpen size={18} />
            Lesson topic
          </button>
        </div>

        {/* Lesson Topic Modal */}
        <AnimatePresence>
          {isTopicModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTopicModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-indigo-100 text-indigo-600 shadow-sm">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Lesson Topic & Theme</h3>
                  </div>
                  <button 
                    onClick={() => setIsTopicModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base">
                      {lesson.topicTheme}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button 
                    onClick={() => setIsTopicModalOpen(false)}
                    className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Inline Time Confirmation Section */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-3 min-w-fit">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Clock size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Section</p>
              <h3 className="text-sm font-bold text-slate-900">Confirm Lesson Time</h3>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-100 hidden lg:block" />

          <div className="flex flex-wrap items-center gap-6 flex-1">
            <div className="flex items-center gap-6">
              {/* Start Time */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">Start:</span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="time" 
                      value={startTime}
                      disabled={isStarted}
                      onChange={(e) => setStartTime(e.target.value)}
                      className={`pl-9 pr-3 py-2 border rounded-xl outline-none transition-all font-medium text-sm w-32 ${
                        isStarted 
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {!isStarted && (
                    <button 
                      onClick={() => setIsStarted(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>

              <div className="w-px h-6 bg-slate-100" />

              {/* End Time */}
              <div className="flex items-center gap-3 group relative">
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">End:</span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="time" 
                      value={endTime}
                      disabled={!isStarted || !isTableComplete || isEnded}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={`pl-9 pr-3 py-2 border rounded-xl outline-none transition-all font-medium text-sm w-32 ${
                        (!isStarted || !isTableComplete || isEnded)
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {isStarted && !isEnded && (
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                      <button 
                        onClick={() => setIsEnded(true)}
                        disabled={!isTableComplete}
                        className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm ${
                          !isTableComplete 
                            ? 'bg-slate-300 cursor-not-allowed' 
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        End Lesson
                      </button>
                      
                      <div className="flex flex-col gap-1.5 max-w-md">
                        {missingData && (
                          <div className="flex items-center gap-2 text-rose-600 text-[10px] font-bold leading-tight">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>Please fill in Homework and Attitude for all students before ending the lesson.</span>
                          </div>
                        )}
                        {timeDeviates && (
                          <div className="flex items-center gap-2 text-amber-600 text-[10px] font-bold leading-tight">
                            <AlertTriangle size={14} className="shrink-0" />
                            <span>Lesson time deviates more than 30 minutes from schedule. This session will not be counted for salary.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <button 
                onClick={() => {
                  setIsStarted(false);
                  setIsEnded(false);
                  setStartTime('08:00');
                  setEndTime('10:00');
                  setLessonNote('');
                  setAttendanceData(classStudents.reduce((acc, student) => ({
                    ...acc,
                    [student.id]: { attendance: '', homework: '', attitude: 'Good', note: '' }
                  }), {}));
                  setExamData(classStudents.reduce((acc, student) => ({
                    ...acc,
                    [student.id]: { 
                      listening: '', 
                      reading: '', 
                      writing: '', 
                      speaking: '', 
                      grammarVocab: '',
                      total: '',
                      note: '',
                      status: '' 
                    }
                  }), {}));
                }}
                className="px-4 py-2 text-slate-400 hover:text-slate-600 font-bold text-xs transition-all flex items-center gap-2"
              >
                <History size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Note Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Edit3 size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">General</p>
              <h3 className="text-sm font-bold text-slate-900">Lesson Note</h3>
            </div>
          </div>
          <textarea
            value={lessonNote}
            onChange={(e) => setLessonNote(e.target.value)}
            placeholder="Enter general notes for this lesson..."
            className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Attendance or Exam Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001f3f] text-white">
                  <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Student ID</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-48">Full Name</th>
                  {isMidterm ? (
                    <>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Listening</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Reading</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Writing</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Speaking</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">G & V</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24 bg-indigo-900/50">Total</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-48">Note</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Status</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Attendance</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Homework</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Attitude</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-48">Note</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map((student) => (
                  <tr key={student.id} className={`transition-colors ${isStarted ? 'hover:bg-slate-50/50' : 'bg-slate-50/30'}`}>
                    <td className="px-4 py-3 text-sm text-center border border-slate-200 text-slate-500">{student.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 border border-slate-200">{student.name}</td>
                    
                    {isMidterm ? (
                      <>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].listening}
                            onChange={(e) => handleExamChange(student.id, 'listening', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].reading}
                            onChange={(e) => handleExamChange(student.id, 'reading', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].writing}
                            onChange={(e) => handleExamChange(student.id, 'writing', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].speaking}
                            onChange={(e) => handleExamChange(student.id, 'speaking', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].grammarVocab}
                            onChange={(e) => handleExamChange(student.id, 'grammarVocab', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200 bg-indigo-50/30">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].total}
                            onChange={(e) => handleExamChange(student.id, 'total', e.target.value)}
                            className="w-full text-center px-1 py-1.5 text-xs border border-indigo-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white font-bold text-indigo-700 disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-2 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].note}
                            onChange={(e) => handleExamChange(student.id, 'note', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all bg-white disabled:bg-slate-50"
                          />
                        </td>
                        <td className="px-4 py-3 border border-slate-200">
                          <select 
                            disabled={!isStarted || isEnded}
                            value={examData[student.id].status}
                            onChange={(e) => handleExamChange(student.id, 'status', e.target.value)}
                            className={`w-full px-2 py-1.5 text-xs border rounded-lg outline-none transition-all font-bold ${
                              examData[student.id].status === 'Pass' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                              examData[student.id].status === 'Fail' ? 'text-rose-600 border-rose-200 bg-rose-50' :
                              'bg-white border-slate-200'
                            } ${(!isStarted || isEnded) && 'opacity-70 cursor-not-allowed'}`}
                          >
                            <option value="">Select</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                          </select>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 border border-slate-200">
                          <select 
                            disabled={!isStarted || isEnded}
                            value={attendanceData[student.id].attendance}
                            onChange={(e) => handleAttendanceChange(student.id, 'attendance', e.target.value)}
                            className={`w-full px-2 py-1.5 text-xs border rounded-lg outline-none transition-all ${
                              !isStarted || isEnded
                                ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-white border-slate-200 focus:border-indigo-500'
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Present">Present</option>
                            <option value="Absence">Absence</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 border border-slate-200">
                          <select 
                            disabled={!isStarted || isEnded}
                            value={attendanceData[student.id].homework}
                            onChange={(e) => handleAttendanceChange(student.id, 'homework', e.target.value)}
                            className={`w-full px-2 py-1.5 text-xs border rounded-lg outline-none transition-all ${
                              !isStarted || isEnded
                                ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-white border-slate-200 focus:border-indigo-500'
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="No">No</option>
                            <option value="Bad">Bad</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 border border-slate-200">
                          <select 
                            disabled={!isStarted || isEnded}
                            value={attendanceData[student.id].attitude}
                            onChange={(e) => handleAttendanceChange(student.id, 'attitude', e.target.value)}
                            className={`w-full px-2 py-1.5 text-xs border rounded-lg outline-none transition-all ${
                              !isStarted || isEnded
                                ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-white border-slate-200 focus:border-indigo-500'
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Bad">Bad</option>
                            <option value="Good">Good</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 border border-slate-200">
                          <input 
                            type="text" 
                            disabled={!isStarted || isEnded}
                            value={attendanceData[student.id].note}
                            onChange={(e) => handleAttendanceChange(student.id, 'note', e.target.value)}
                            placeholder="Notes..."
                            className={`w-full px-2 py-1.5 text-xs border rounded-lg outline-none transition-all ${
                              !isStarted || isEnded
                                ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-white border-slate-200 focus:border-indigo-500'
                            }`}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    );
  };

  const ClassDetailView = ({ cls, onBack }: { cls: Class; onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'attendance' | 'students' | 'syllabus' | 'lesson-schedule' | 'test-report'>('attendance');
    const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
    const [isEditingSyllabus, setIsEditingSyllabus] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState('Test 1');

    const [testReports, setTestReports] = useState<Record<string, Record<string, any>>>(
      MOCK_STUDENTS.reduce((acc, student) => ({
        ...acc,
        [student.id]: {
          'Test 1': { listening: { score: '', feedback: '' }, reading: { score: '', feedback: '' }, writing: { score: '', feedback: '' }, speaking: { score: '', feedback: '' }, grammar: { score: '', feedback: '' }, total: '' },
          'Test 2': { listening: { score: '', feedback: '' }, reading: { score: '', feedback: '' }, writing: { score: '', feedback: '' }, speaking: { score: '', feedback: '' }, grammar: { score: '', feedback: '' }, total: '' },
          'Midterm Test': { listening: { score: '', feedback: '' }, reading: { score: '', feedback: '' }, writing: { score: '', feedback: '' }, speaking: { score: '', feedback: '' }, grammar: { score: '', feedback: '' }, total: '' },
          'Final Test': { listening: { score: '', feedback: '' }, reading: { score: '', feedback: '' }, writing: { score: '', feedback: '' }, speaking: { score: '', feedback: '' }, grammar: { score: '', feedback: '' }, total: '' },
        }
      }), {})
    );

    const updateTestScore = (studentId: string, skill: string, field: 'score' | 'feedback', value: string) => {
      setTestReports(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [selectedTest]: {
            ...prev[studentId][selectedTest],
            [skill]: {
              ...prev[studentId][selectedTest][skill],
              [field]: value
            }
          }
        }
      }));
    };

    const updateTestTotal = (studentId: string, value: string) => {
      setTestReports(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [selectedTest]: {
            ...prev[studentId][selectedTest],
            total: value
          }
        }
      }));
    };

    const [syllabusItems, setSyllabusItems] = useState([
      { 
        id: 1, 
        noLessons: '1', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-19', 
        dayOfWeek: 'Tuesday',
        teacher: 'Hà', 
        skill: 'R&L', 
        unit: 'Unit 1: The man-made environment', 
        topicTheme: 'Reading:\n- skim the text quickly to understand the general idea\n- scan a text for specific information to answer short-answer questions\n- use skimming and scanning to locate the answer quickly\n- understand and produce paraphrasing\n- use the present continuous and present simple correctly\nListening:\n- predict the type of information required for short-answer questions\n- listen for specific information (e.g. complex numbers, difficult spellings) and write it down correctly\n- listen to understand context\n- answer multiple-choice questions correctly by eliminating distractors',
        note: ''
      },
      { 
        id: 2, 
        noLessons: '2', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-21', 
        dayOfWeek: 'Thursday',
        teacher: 'Thành', 
        skill: 'W', 
        unit: 'Unit 1: The man-made environment', 
        topicTheme: 'Writing UNIT 1\nselect key features of different types of graph, chart and table in order to describe them accurately\nuse suitable verbs, adjectives and adverbs to describe trends in different ways\ncompare different graphs or information in the same graph and write a summary of main features\nKey Grammar: adjectives and adverbs to describe trends\nSupplement: P.84-86',
        note: ''
      },
      { 
        id: 3, 
        noLessons: '3', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-23', 
        dayOfWeek: 'Saturday',
        teacher: 'Thành', 
        skill: 'S', 
        unit: 'Unit 1: The man-made environment', 
        topicTheme: 'Speaking:\n- speak about various aspects of where you live for Speaking Part 1\n- respond to Wh-, would and Yes/No questions about where you live\n- prepare more information for common Speaking Part 1 topics\n- use syllable stress in words correctly',
        note: ''
      },
      { 
        id: 4, 
        noLessons: '4', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-26', 
        dayOfWeek: 'Tuesday',
        teacher: 'Hà', 
        skill: 'R&L', 
        unit: 'Unit 2: Leisure and recreation', 
        topicTheme: 'Reading:\n- identify the main idea of a paragraph\n- match headings to paragraphs\n- use the present simple and adverbs of frequency correctly',
        note: ''
      },
      { 
        id: 5, 
        noLessons: '5', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-28', 
        dayOfWeek: 'Thursday',
        teacher: 'Thành', 
        skill: 'W', 
        unit: 'Unit 2: Leisure and recreation', 
        topicTheme: 'Writing:\n- describe a process\n- use sequence markers correctly',
        note: ''
      },
      { 
        id: 6, 
        noLessons: '6', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-03-30', 
        dayOfWeek: 'Saturday',
        teacher: 'Lan', 
        skill: 'S', 
        unit: 'Unit 2: Leisure and recreation', 
        topicTheme: 'Speaking:\n- talk about free time activities\n- use adverbs of frequency',
        note: ''
      },
      { 
        id: 7, 
        noLessons: '7', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-02', 
        dayOfWeek: 'Tuesday',
        teacher: 'Hùng', 
        skill: 'Grammar', 
        unit: 'Unit 3: News and media', 
        topicTheme: 'Grammar:\n- past simple vs past continuous\n- reporting verbs',
        note: ''
      },
      { 
        id: 8, 
        noLessons: '8', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-04', 
        dayOfWeek: 'Thursday',
        teacher: 'Minh', 
        skill: 'Vocabulary', 
        unit: 'Unit 3: News and media', 
        topicTheme: 'Vocabulary:\n- media types\n- journalism terms',
        note: ''
      },
      { 
        id: 9, 
        noLessons: '9', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-06', 
        dayOfWeek: 'Saturday',
        teacher: 'Thành', 
        skill: 'Test', 
        unit: 'Midterm test', 
        topicTheme: 'Midterm test covering Units 1-3.\nListening, Reading, Writing, Speaking, Grammar & Vocabulary.',
        note: ''
      },
      { 
        id: 10, 
        noLessons: '10', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-09', 
        dayOfWeek: 'Tuesday',
        teacher: 'Thành', 
        skill: 'W', 
        unit: 'Unit 4: Travel and transport', 
        topicTheme: 'Writing:\n- data comparison in maps',
        note: ''
      },
      { 
        id: 11, 
        noLessons: '11', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-11', 
        dayOfWeek: 'Thursday',
        teacher: 'Lan', 
        skill: 'Test', 
        unit: 'Midterm test', 
        topicTheme: 'Midterm assessment for Units 1-4',
        note: ''
      },
      { 
        id: 12, 
        noLessons: '12', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-13', 
        dayOfWeek: 'Saturday',
        teacher: 'Hùng', 
        skill: 'Grammar', 
        unit: 'Unit 4: Travel and transport', 
        topicTheme: 'Grammar:\n- articles\n- prepositions of movement',
        note: ''
      },
      { 
        id: 13, 
        noLessons: '13', 
        hrs: '2,00', 
        duration: '7-9:00',
        date: '2024-04-16', 
        dayOfWeek: 'Tuesday',
        teacher: 'Minh', 
        skill: 'Vocabulary', 
        unit: 'Unit 5: Business and work', 
        topicTheme: 'Vocabulary:\n- job sectors\n- workplace environment',
        note: ''
      },
    ]);

    const getFullSkillName = (skill: string) => {
      const mapping: Record<string, string> = {
        'R&L': 'Reading & Listening',
        'W': 'Writing',
        'S': 'Speaking',
        'Grammar': 'Grammar',
        'Vocabulary': 'Vocabulary',
        'Test': 'Test'
      };
      return mapping[skill] || skill;
    };

    if (selectedLesson) {
      return <LessonDetailView lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
    }

    const teachers = ['Hà', 'Thành', 'Lan', 'Hùng', 'Minh'];
    const skills = ['R&L', 'W', 'S', 'Grammar', 'Vocabulary', 'Test'];

    const handleSyllabusChange = (id: number, field: string, value: any) => {
      setSyllabusItems(prev => prev.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value } as any;
          if (field === 'skill' && value === 'Test' && !updatedItem.teachers) {
            updatedItem.teachers = [{ name: item.teacher || teachers[0], startTime: '07:00', endTime: '09:00' }];
          }
          return updatedItem;
        }
        return item;
      }));
    };

    const addTeacher = (id: number) => {
      setSyllabusItems(prev => prev.map(item => {
        if (item.id === id) {
          const currentTeachers = (item as any).teachers || [{ name: (item as any).teacher || teachers[0], startTime: '07:00', endTime: '09:00' }];
          return {
            ...item,
            teachers: [...currentTeachers, { name: teachers[0], startTime: '07:00', endTime: '09:00' }]
          };
        }
        return item;
      }));
    };

    const removeTeacher = (id: number, idx: number) => {
      setSyllabusItems(prev => prev.map(item => {
        if (item.id === id && (item as any).teachers) {
          const newTeachers = [...(item as any).teachers];
          newTeachers.splice(idx, 1);
          return { ...item, teachers: newTeachers };
        }
        return item;
      }));
    };

    const updateTeacher = (id: number, idx: number, field: string, value: string) => {
      setSyllabusItems(prev => prev.map(item => {
        if (item.id === id && (item as any).teachers) {
          const newTeachers = [...(item as any).teachers];
          newTeachers[idx] = { ...newTeachers[idx], [field]: value };
          return { ...item, teachers: newTeachers };
        }
        return item;
      }));
    };

    const moveSyllabusItem = (index: number, direction: 'up' | 'down') => {
      const newItems = [...syllabusItems];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newItems.length) return;
      
      const [movedItem] = newItems.splice(index, 1);
      newItems.splice(targetIndex, 0, movedItem);
      setSyllabusItems(newItems);
    };

    const classStudents = MOCK_STUDENTS.filter(s => s.course === cls.course).slice(0, cls.studentCount);

    const AddStudentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedStudentForType, setSelectedStudentForType] = useState<Student | null>(null);

      const filteredAvailableStudents = MOCK_STUDENTS.filter(s => 
        (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         s.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !classStudents.find(cs => cs.id === s.id)
      );

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Thêm học viên vào lớp</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm theo tên hoặc mã học viên..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-0">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAvailableStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                        {parseInt(student.id) < 10 ? `ST00${student.id}` : `ST0${student.id}`}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{student.name}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedStudentForType(student)}
                          className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAvailableStudents.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                        Không tìm thấy học viên nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
              >
                Đóng
              </button>
            </div>

            {/* Nested Modal for Type Selection */}
            <AnimatePresence>
              {selectedStudentForType && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-6"
                  >
                    <div className="text-center space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">Chọn loại học viên</h4>
                      <p className="text-sm text-slate-500">Học viên: <span className="font-bold text-slate-700">{selectedStudentForType.name}</span></p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <button 
                        onClick={() => {
                          alert(`Đã thêm học viên ${selectedStudentForType.name} (Trial) vào lớp!`);
                          setSelectedStudentForType(null);
                        }}
                        className="w-full py-3 bg-amber-50 text-amber-700 rounded-xl font-bold hover:bg-amber-100 transition-all border border-amber-200"
                      >
                        Trial
                      </button>
                      <button 
                        onClick={() => {
                          alert(`Đã thêm học viên ${selectedStudentForType.name} (Official) vào lớp!`);
                          setSelectedStudentForType(null);
                        }}
                        className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-all border border-emerald-200"
                      >
                        Official
                      </button>
                    </div>

                    <button 
                      onClick={() => setSelectedStudentForType(null)}
                      className="w-full py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
                    >
                      Hủy bỏ
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white rounded-xl border border-slate-200 text-slate-500 transition-all shadow-sm"
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">{cls.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  cls.status === 'OnGoing' ? 'bg-emerald-100 text-emerald-700' : 
                  cls.status === 'PreOpening' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {cls.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{cls.level || cls.course}</p>
            </div>
          </div>
          {activeTab === 'syllabus' && (
            <button
              onClick={() => setIsEditingSyllabus(!isEditingSyllabus)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                isEditingSyllabus 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isEditingSyllabus ? (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 size={18} />
                  Edit Syllabus
                </>
              )}
            </button>
          )}
        </div>

        {/* Class Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {/* Left Column: Class Info */}
          <div className="lg:col-span-4 space-y-6 lg:border-r border-slate-100 lg:pr-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Lessons</p>
                <p className="text-sm font-bold text-slate-800">{cls.totalLessons} lessons</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SC Staff</p>
                <p className="text-sm font-bold text-slate-800">{cls.scStaff || 'N/A'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Weekly Time</p>
              <div className="space-y-2">
                {cls.weeklySchedule?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">{item.day}:</span>
                    <span className="text-slate-800 font-bold">{item.time}</span>
                  </div>
                ))}
                {!cls.weeklySchedule && (
                  <p className="text-sm text-slate-400 italic">No schedule set</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Materials & Outcomes */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-2">
            {/* Materials Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Course Book</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {cls.courseBook || 'N/A'}
                </p>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Supplementary Materials</h4>
                <div className="space-y-4">
                  {cls.supplementaryMaterials?.map((section, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-bold text-slate-800 mb-1.5">{section.category}</p>
                      <ul className="space-y-1.5 ml-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                            {item.link ? (
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#303B70] hover:underline font-medium">
                                {item.label}
                              </a>
                            ) : (
                              <span>{item.label}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcomes Section */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Learning Outcomes</h4>
              <div className="grid grid-cols-1 gap-2">
                {cls.learningOutcomes?.map((outcome, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                    <span className="text-xs font-bold text-slate-500">{outcome.skill}</span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                      {outcome.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-8">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'attendance' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Attendance
            {activeTab === 'attendance' && (
              <motion.div layoutId="activeClassTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'students' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Student List
            {activeTab === 'students' && (
              <motion.div layoutId="activeClassTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'syllabus' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Syllabus
            {activeTab === 'syllabus' && (
              <motion.div layoutId="activeClassTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('lesson-schedule')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'lesson-schedule' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Lesson schedule
            {activeTab === 'lesson-schedule' && (
              <motion.div layoutId="activeClassTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('test-report')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'test-report' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Test Report
            {activeTab === 'test-report' && (
              <motion.div layoutId="activeClassTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {activeTab === 'attendance' ? (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {syllabusItems.map((item, idx) => {
                  const status = idx === 0 ? 'done' : idx === 1 ? 'inprogress' : 'not started';
                  
                  const formatTimePart = (p: string) => p.includes(':') ? p : `${p}:00`;
                  let timeDisplay = '';
                  if (item.skill === 'Test' && (item as any).teachers) {
                    const start = (item as any).teachers[0]?.startTime || '';
                    const end = (item as any).teachers[0]?.endTime || '';
                    timeDisplay = `${formatTimePart(start)} ~ ${formatTimePart(end)}`;
                  } else if (item.duration) {
                    const parts = item.duration.split('-').map(p => p.trim());
                    if (parts.length === 2) {
                      timeDisplay = `${formatTimePart(parts[0])} ~ ${formatTimePart(parts[1])}`;
                    }
                  }

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedLesson(item)}
                      className={`rounded-2xl transition-all p-5 space-y-4 relative group cursor-pointer ${
                        status === 'inprogress' 
                          ? 'bg-orange-50 border-[3px] border-orange-500 ring-4 ring-orange-500/10 z-10' 
                          : 'bg-white border-2 border-slate-100 shadow-sm hover:border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                            status === 'inprogress' ? 'bg-orange-500 text-white' : 'bg-indigo-50 text-indigo-600'
                          }`}>
                            Lesson {item.noLessons}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                            status === 'inprogress' ? 'bg-white text-orange-600 border border-orange-200' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {getFullSkillName(item.skill)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {status === 'inprogress' && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${
                            status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                            status === 'inprogress' ? 'text-orange-700 font-extrabold' :
                            'bg-slate-50 text-slate-400'
                          }`}>
                            {status === 'done' ? 'Done' : status === 'inprogress' ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className={`text-sm font-bold line-clamp-2 min-h-[40px] ${
                          status === 'inprogress' ? 'text-orange-900' : 'text-slate-900'
                        }`}>
                          {item.unit}
                        </h4>
                        <div className="flex items-center gap-2 mt-3 text-slate-700">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            status === 'inprogress' ? 'bg-orange-200 text-orange-700' : 'bg-indigo-100 text-indigo-600'
                          }`}>
                            {item.teacher.charAt(0)}
                          </div>
                          <span className={`text-sm font-bold ${status === 'inprogress' ? 'text-orange-800' : 'text-slate-700'}`}>
                            {item.teacher}
                          </span>
                        </div>
                      </div>

                      <div className={`pt-4 border-t flex flex-col gap-2 ${
                        status === 'inprogress' ? 'border-orange-200' : 'border-slate-50'
                      }`}>
                        <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-widest ${
                          status === 'inprogress' ? 'text-orange-500' : 'text-slate-400'
                        }`}>
                          <span>{item.date}</span>
                          <span>{item.dayOfWeek}</span>
                        </div>
                        {timeDisplay && (
                          <div className={`flex items-center gap-1.5 text-[10px] font-bold ${
                            status === 'inprogress' ? 'text-orange-600' : 'text-slate-500'
                          }`}>
                            <Clock size={12} className={status === 'inprogress' ? 'text-orange-400' : 'text-slate-300'} />
                            <span>{timeDisplay}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'students' ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Danh sách học viên ({classStudents.length})</h3>
                <button 
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <Plus size={18} />
                  Add student
                </button>
              </div>

              <AddStudentModal 
                isOpen={isAddStudentModalOpen} 
                onClose={() => setIsAddStudentModalOpen(false)} 
              />

              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student ID</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Join Date</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classStudents.map((student, index) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                          {parseInt(student.id) < 10 ? `ST00${student.id}` : `ST0${student.id}`}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-[10px]">
                              {student.name.split(' ').pop()?.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-slate-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {student.joinDate}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                            student.status === 'Trial' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleStudentClick(student)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'test-report' ? (
            <div className="p-8 space-y-6">
              {/* Test Report Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Test Report</h3>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    <Save size={18} />
                    Save
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Test</label>
                  <select 
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                    className="w-48 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="Test 1">Test 1</option>
                    <option value="Test 2">Test 2</option>
                    <option value="Midterm Test">Midterm Test</option>
                    <option value="Final Test">Final Test</option>
                  </select>
                </div>
              </div>

              {/* Test Report Table */}
              <div className="overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-[#303B70] text-white">
                      <th className="w-12 px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">STT</th>
                      <th className="w-48 px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Student Name</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Listening</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Reading</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Writing</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Speaking</th>
                      <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-r border-white/10">Grammar & Vocab</th>
                      <th className="w-32 px-4 py-3 text-[10px] font-bold uppercase tracking-widest">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classStudents.map((student, index) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 text-xs text-slate-400 font-medium text-center border-r border-slate-100">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 border-r border-slate-100">
                          <span className="text-sm font-bold text-slate-900">{student.name}</span>
                        </td>
                        
                        {/* Skill Columns */}
                        {['listening', 'reading', 'writing', 'speaking', 'grammar'].map((skill) => (
                          <td key={skill} className="px-3 py-2 border-r border-slate-100">
                            <div className="space-y-1.5">
                              <input 
                                type="number" 
                                placeholder="Score"
                                value={testReports[student.id]?.[selectedTest]?.[skill]?.score || ''}
                                onChange={(e) => updateTestScore(student.id, skill, 'score', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              />
                              <textarea 
                                placeholder="Feedback"
                                value={testReports[student.id]?.[selectedTest]?.[skill]?.feedback || ''}
                                onChange={(e) => updateTestScore(student.id, skill, 'feedback', e.target.value)}
                                className="w-full px-2 py-1 bg-slate-50/50 border border-slate-200 rounded-lg text-[10px] text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-10"
                              />
                            </div>
                          </td>
                        ))}

                        {/* Total Column */}
                        <td className="px-4 py-3 bg-slate-50/50 text-center">
                          <input 
                            type="number" 
                            placeholder="Total"
                            value={testReports[student.id]?.[selectedTest]?.total || ''}
                            onChange={(e) => updateTestTotal(student.id, e.target.value)}
                            className="w-full px-3 py-2.5 bg-white border-2 border-indigo-200 rounded-xl text-lg font-black text-indigo-700 text-center shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'lesson-schedule' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001f3f] text-white">
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Teacher</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Class ID</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Lesson Name</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Start Time</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">End Time</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Room</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase border border-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {syllabusItems.map((item) => {
                    const status = parseInt(item.noLessons) < cls.currentLesson ? 'done' : 
                                   parseInt(item.noLessons) === cls.currentLesson ? 'on going' : 'not started';
                    
                    let startTimeDisplay = '';
                    let endTimeDisplay = '';

                    if (item.skill === 'Test' && (item as any).teachers) {
                      startTimeDisplay = (item as any).teachers.map((t: any) => t.startTime).join(', ');
                      endTimeDisplay = (item as any).teachers.map((t: any) => t.endTime).join(', ');
                    } else if (item.duration) {
                      const parts = item.duration.split('-');
                      startTimeDisplay = parts[0]?.trim() || '';
                      endTimeDisplay = parts[1]?.trim() || '';
                    }

                    const teacherDisplay = item.skill === 'Test' && (item as any).teachers ?
                      (item as any).teachers.map((t: any) => t.name).join(', ') :
                      item.teacher;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{teacherDisplay}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{cls.id}</td>
                        <td className="px-4 py-3 text-sm font-bold text-indigo-700">{item.unit}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{startTimeDisplay}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{endTimeDisplay}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{cls.room}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {status === 'on going' && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                              </span>
                            )}
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                              status === 'on going' ? 'bg-orange-100 text-orange-700' :
                              'bg-slate-100 text-slate-400'
                            }`}>
                              {status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'syllabus' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-[#001f3f] text-white">
                    {isEditingSyllabus && (
                      <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-12">Move</th>
                    )}
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-20">No. Lessons</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Lesson duration</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-16">Hrs</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-20">Day</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-24">Date</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Teacher</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-20">Skill</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-48">Unit</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center min-w-[400px]">Topic/Theme</th>
                    <th className="px-2 py-3 text-[11px] font-bold uppercase border border-slate-700 text-center w-32">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {syllabusItems.map((item, index) => (
                    <tr key={item.id}>
                      {isEditingSyllabus && (
                        <td className="border border-slate-200 px-1 py-3">
                          <div className="flex flex-col items-center gap-1">
                            <button 
                              onClick={() => moveSyllabusItem(index, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-20 transition-all"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button 
                              onClick={() => moveSyllabusItem(index, 'down')}
                              disabled={index === syllabusItems.length - 1}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-20 transition-all"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        </td>
                      )}
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <input 
                            type="text" 
                            value={item.noLessons} 
                            onChange={(e) => handleSyllabusChange(item.id, 'noLessons', e.target.value)}
                            className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors"
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm text-center">{item.noLessons}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          item.skill === 'Test' ? (
                            <div className="flex flex-col gap-1 p-1">
                              {((item as any).teachers || []).map((t: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-1 text-[10px] bg-slate-50 p-1 rounded border border-slate-100">
                                  <span className="font-medium truncate w-12 text-slate-500">{t.name}:</span>
                                  <input 
                                    type="time" 
                                    value={t.startTime} 
                                    onChange={(e) => updateTeacher(item.id, idx, 'startTime', e.target.value)}
                                    className="border rounded p-0.5 outline-none focus:border-indigo-300"
                                  />
                                  <span>-</span>
                                  <input 
                                    type="time" 
                                    value={t.endTime} 
                                    onChange={(e) => updateTeacher(item.id, idx, 'endTime', e.target.value)}
                                    className="border rounded p-0.5 outline-none focus:border-indigo-300"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <input 
                              type="text" 
                              value={item.duration || ''} 
                              onChange={(e) => handleSyllabusChange(item.id, 'duration', e.target.value)}
                              className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors"
                            />
                          )
                        ) : (
                          item.skill === 'Test' ? (
                            <div className="px-2 py-3 text-[10px] flex flex-col gap-0.5">
                              {((item as any).teachers || []).map((t: any, idx: number) => (
                                <div key={idx} className="whitespace-nowrap">
                                  <span className="font-bold text-slate-700">{t.name}:</span> {t.startTime} - {t.endTime}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="px-2 py-3 text-sm text-center">{item.duration}</div>
                          )
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <input 
                            type="text" 
                            value={item.hrs} 
                            onChange={(e) => handleSyllabusChange(item.id, 'hrs', e.target.value)}
                            className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors"
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm text-center">{item.hrs}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <select 
                            value={item.dayOfWeek} 
                            onChange={(e) => handleSyllabusChange(item.id, 'dayOfWeek', e.target.value)}
                            className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors bg-transparent"
                          >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        ) : (
                          <div className="px-2 py-3 text-sm text-center">{item.dayOfWeek}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <input 
                            type="date" 
                            value={item.date} 
                            onChange={(e) => handleSyllabusChange(item.id, 'date', e.target.value)}
                            className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors font-bold"
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm text-center font-bold">{item.date}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          item.skill === 'Test' ? (
                            <div className="flex flex-col gap-1 p-1 min-w-[120px]">
                              {((item as any).teachers || []).map((t: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-1 group">
                                  <select 
                                    value={t.name}
                                    onChange={(e) => updateTeacher(item.id, idx, 'name', e.target.value)}
                                    className="text-xs border rounded p-1 flex-1 outline-none focus:border-indigo-300"
                                  >
                                    {teachers.map(name => <option key={name} value={name}>{name}</option>)}
                                  </select>
                                  <button 
                                    onClick={() => removeTeacher(item.id, idx)} 
                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                    title="Remove teacher"
                                  >
                                    <X size={12}/>
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => addTeacher(item.id)} 
                                className="text-indigo-600 text-[10px] font-bold flex items-center gap-1 hover:text-indigo-700 mt-1"
                              >
                                <Plus size={12}/> Add Teacher
                              </button>
                            </div>
                          ) : (
                            <select 
                              value={item.teacher} 
                              onChange={(e) => handleSyllabusChange(item.id, 'teacher', e.target.value)}
                              className="w-full px-2 py-3 text-sm outline-none focus:bg-indigo-50 transition-colors bg-transparent"
                            >
                              {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          )
                        ) : (
                          item.skill === 'Test' ? (
                            <div className="px-2 py-3 text-sm flex flex-wrap gap-1">
                              {((item as any).teachers || []).map((t: any, idx: number) => (
                                <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-medium text-slate-700 border border-slate-200">
                                  {t.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="px-2 py-3 text-sm">{item.teacher}</div>
                          )
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <select 
                            value={item.skill} 
                            onChange={(e) => handleSyllabusChange(item.id, 'skill', e.target.value)}
                            className="w-full px-2 py-3 text-sm text-center outline-none focus:bg-indigo-50 transition-colors font-bold bg-transparent"
                          >
                            {skills.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        ) : (
                          <div className="px-2 py-3 text-sm text-center font-bold">{item.skill}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <textarea 
                            value={item.unit} 
                            onChange={(e) => handleSyllabusChange(item.id, 'unit', e.target.value)}
                            className="w-full px-2 py-3 text-sm outline-none focus:bg-indigo-50 transition-colors resize-none text-indigo-700 font-bold"
                            rows={3}
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm text-indigo-700 font-bold whitespace-pre-wrap">{item.unit}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <textarea 
                            value={item.topicTheme} 
                            onChange={(e) => handleSyllabusChange(item.id, 'topicTheme', e.target.value)}
                            className="w-full px-2 py-3 text-sm outline-none focus:bg-indigo-50 transition-colors resize-none"
                            rows={6}
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm whitespace-pre-wrap">{item.topicTheme}</div>
                        )}
                      </td>
                      <td className="border border-slate-200">
                        {isEditingSyllabus ? (
                          <textarea 
                            value={item.note} 
                            onChange={(e) => handleSyllabusChange(item.id, 'note', e.target.value)}
                            className="w-full px-2 py-3 text-sm outline-none focus:bg-indigo-50 transition-colors resize-none"
                            rows={3}
                          />
                        ) : (
                          <div className="px-2 py-3 text-sm whitespace-pre-wrap">{item.note}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  };

  const ContractDetailView = ({ contract, onBack }: { contract: Contract; onBack: () => void }) => {
    const [discount, setDiscount] = useState(contract.discount || 0);
    const [transferStudentId, setTransferStudentId] = useState('');
    const [transfer, setTransfer] = useState(contract.transferAmount || 0);
    const [lateDeduction, setLateDeduction] = useState(contract.lateEntryDeduction || 0);
    const [periods, setPeriods] = useState(contract.paymentPeriods || []);
    const [numPeriods, setNumPeriods] = useState(contract.paymentPeriods?.length || 1);

    const totalAdjusted = contract.totalFee - discount - transfer - lateDeduction;
    const isOverdue = periods.some(p => p.status === 'Overdue');

    const handleNumPeriodsChange = (val: number) => {
      setNumPeriods(val);
      const newPeriods = [...periods];
      if (val > periods.length) {
        for (let i = periods.length; i < val; i++) {
          newPeriods.push({
            id: `p-new-${Date.now()}-${i}`,
            dueDate: new Date().toISOString().split('T')[0],
            amount: 0,
            status: 'Unpaid'
          });
        }
      } else if (val < periods.length) {
        newPeriods.splice(val);
      }
      setPeriods(newPeriods);
    };

    const updatePeriod = (id: string, field: keyof PaymentPeriod, value: any) => {
      setPeriods(periods.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    // Mock data for transfer students
    const transferStudents = [
      { id: 's2', name: 'Trần Thị B', amount: 1500000 },
      { id: 's3', name: 'Lê Văn C', amount: 2000000 },
      { id: 's4', name: 'Phạm Minh D', amount: 500000 },
    ];

    const handleTransferStudentChange = (id: string) => {
      setTransferStudentId(id);
      const student = transferStudents.find(s => s.id === id);
      setTransfer(student ? student.amount : 0);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-20"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white rounded-xl border border-slate-200 text-slate-500 transition-all shadow-sm"
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">Chi tiết hợp đồng {contract.contractNumber}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  contract.status === 'Signed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {contract.status === 'Signed' ? 'Đã ký' : 'Chờ ký'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Ngày tạo: {contract.date} • Loại: {contract.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-colors">
              Xuất PDF
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              Lưu thay đổi
            </button>
          </div>
        </div>

        {isOverdue && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-700"
          >
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-bold">Cảnh báo: Quá hạn thanh toán</p>
              <p className="text-sm opacity-80">Hợp đồng này có kỳ thanh toán đã quá hạn. Vui lòng liên hệ học viên để xử lý.</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Adjustments & Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course List Section */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={18} />
                </div>
                <h3 className="font-bold text-slate-900">Danh sách khóa học</h3>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã khóa học</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Học phí</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {contract.courses && contract.courses.length > 0 ? (
                      contract.courses.map((course, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-sm font-bold text-slate-700">{course.id}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-sm font-bold text-indigo-600">{course.fee.toLocaleString('vi-VN')} đ</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center text-slate-400 text-sm italic">
                          Chưa có thông tin khóa học
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Price Adjustments */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign size={18} />
                </div>
                <h3 className="font-bold text-slate-900">Điều chỉnh giá hợp đồng</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Giảm giá (Discount)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">VNĐ</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tiền chuyển từ HV khác</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      value={transferStudentId}
                      onChange={(e) => handleTransferStudentChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="">Chọn học viên...</option>
                      {transferStudents.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    <div className="relative">
                      <input 
                        type="number"
                        value={transfer}
                        readOnly
                        className="w-full pl-4 pr-12 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">VNĐ</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Khấu trừ học phí vào muộn</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={lateDeduction}
                      onChange={(e) => setLateDeduction(Number(e.target.value))}
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">VNĐ</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                <span className="text-sm text-slate-500">Tổng giá trị sau điều chỉnh:</span>
                <span className="text-xl font-black text-indigo-600">{totalAdjusted.toLocaleString('vi-VN')} đ</span>
              </div>
            </section>

            {/* Payment Schedule */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900">Kỳ thanh toán</h3>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-500">Số kỳ:</label>
                  <input 
                    type="number" 
                    min="1"
                    max="12"
                    value={numPeriods}
                    onChange={(e) => handleNumPeriodsChange(Number(e.target.value))}
                    className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {periods.map((period, idx) => (
                  <div key={period.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-all group">
                    <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Hạn thanh toán</p>
                        <input 
                          type="date" 
                          value={period.dueDate}
                          onChange={(e) => updatePeriod(period.id, 'dueDate', e.target.value)}
                          className="text-sm font-bold text-slate-700 bg-transparent outline-none focus:ring-1 focus:ring-indigo-200 rounded px-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Số tiền</p>
                        <input 
                          type="number" 
                          value={period.amount}
                          onChange={(e) => updatePeriod(period.id, 'amount', Number(e.target.value))}
                          className="text-sm font-bold text-slate-700 bg-transparent outline-none w-full focus:ring-1 focus:ring-indigo-200 rounded px-1"
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <select 
                          value={period.status}
                          onChange={(e) => updatePeriod(period.id, 'status', e.target.value)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold outline-none border-none cursor-pointer ${
                            period.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                            period.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                            'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <option value="Paid">Đã đóng</option>
                          <option value="Unpaid">Chưa đóng</option>
                          <option value="Overdue">Quá hạn</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: History Log */}
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                <div className="w-8 h-8 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center">
                  <History size={18} />
                </div>
                <h3 className="font-bold text-slate-900">Lịch sử chỉnh sửa</h3>
              </div>

              <div className="flex-1 space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {contract.history?.map((log) => (
                  <div key={log.id} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900">{log.action}</p>
                        <span className="text-[10px] text-slate-400">{log.updateTime}</span>
                      </div>
                      <p className="text-xs text-slate-500">{log.details}</p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Bởi: {log.updatedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    );
  };

  const StudentDetailView = () => {
    const [activeTab, setActiveTab] = useState('entrance-test');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddPTModalOpen, setIsAddPTModalOpen] = useState(false);
    const [newContractType, setNewContractType] = useState<'Combo' | 'Single'>('Combo');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedRoadmapCourses, setSelectedRoadmapCourses] = useState<string[]>([]);

    const AddPlacementTestModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
      const [formData, setFormData] = useState({
        courseName: '',
        testCode: '',
        ptResult: { level: '', courseId: '' },
        outputResult: { level: '', courseId: '' },
        listening: '',
        reading: '',
        writing: '',
        speaking: '',
        grammarVocab: '',
        overall: '',
        teacherComment: '',
        note: ''
      });

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Add placement test</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Course name</label>
                  <select 
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn khóa học...</option>
                    {Object.keys(COURSE_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">PT Test code</label>
                  <input 
                    type="text"
                    value={formData.testCode}
                    onChange={(e) => setFormData({...formData, testCode: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">PT Test result</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text"
                      placeholder="Level"
                      value={formData.ptResult.level}
                      onChange={(e) => setFormData({...formData, ptResult: {...formData.ptResult, level: e.target.value}})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <select 
                      value={formData.ptResult.courseId}
                      onChange={(e) => setFormData({...formData, ptResult: {...formData.ptResult, courseId: e.target.value}})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Course ID</option>
                      {formData.courseName && COURSE_DATA[formData.courseName].map(id => (
                        <option key={id} value={id}>{id}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Output result</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text"
                      placeholder="Level"
                      value={formData.outputResult.level}
                      onChange={(e) => setFormData({...formData, outputResult: {...formData.outputResult, level: e.target.value}})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <select 
                      value={formData.outputResult.courseId}
                      onChange={(e) => setFormData({...formData, outputResult: {...formData.outputResult, courseId: e.target.value}})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Course ID</option>
                      {formData.courseName && COURSE_DATA[formData.courseName].map(id => (
                        <option key={id} value={id}>{id}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Listening</label>
                  <input 
                    type="text"
                    value={formData.listening}
                    onChange={(e) => setFormData({...formData, listening: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Reading</label>
                  <input 
                    type="text"
                    value={formData.reading}
                    onChange={(e) => setFormData({...formData, reading: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Writing</label>
                  <input 
                    type="text"
                    value={formData.writing}
                    onChange={(e) => setFormData({...formData, writing: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Speaking</label>
                  <input 
                    type="text"
                    value={formData.speaking}
                    onChange={(e) => setFormData({...formData, speaking: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Grammar & Vocab</label>
                  <input 
                    type="text"
                    value={formData.grammarVocab}
                    onChange={(e) => setFormData({...formData, grammarVocab: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Overall</label>
                  <input 
                    type="text"
                    value={formData.overall}
                    onChange={(e) => setFormData({...formData, overall: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Teacher comment</label>
                <textarea 
                  value={formData.teacherComment}
                  onChange={(e) => setFormData({...formData, teacherComment: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Note</label>
                <textarea 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                />
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => {
                  alert('Lần kiểm tra đã được thêm thành công!');
                  onClose();
                }}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Check size={18} />
                Lưu kết quả
              </button>
            </div>
          </motion.div>
        </div>
      );
    };

    const roadmaps = [
      'Lộ trình IELTS 0 - 6.5 (Tiết kiệm 15%)',
      'Lộ trình TOEIC 0 - 750 (Tiết kiệm 10%)',
      'Lộ trình Giao tiếp & Business English',
      'Lộ trình English for Kids (Level 1-3)'
    ];

    const roadmapDetails: Record<string, string[]> = {
      'Lộ trình IELTS 0 - 6.5 (Tiết kiệm 15%)': ['IELTS-STR', 'IELTS-FND', 'IELTS-INT', 'IELTS-ADV'],
      'Lộ trình TOEIC 0 - 750 (Tiết kiệm 10%)': ['TOEIC-450', 'TOEIC-650', 'TOEIC-750'],
      'Lộ trình Giao tiếp & Business English': ['COMM-BASIC', 'BIZ-ENG-1', 'BIZ-ENG-2'],
      'Lộ trình English for Kids (Level 1-3)': ['KID-L1', 'KID-L2', 'KID-L3']
    };

    const singleCourses = [
      'IELTS Starter',
      'Pre IELTS 1',
      'Pre IELTS 2',
      'IELTS Foundation 1',
      'TOEIC 450+',
      'Business English Basic'
    ];

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Modal Overlay */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Tạo hợp đồng mới</h3>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                  >
                    <Plus size={20} className="rotate-45" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Contract Type Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Loại hợp đồng</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setNewContractType('Combo');
                          setSelectedOption('');
                          setSelectedRoadmapCourses([]);
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          newContractType === 'Combo' 
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newContractType === 'Combo' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                          <LayoutDashboard size={16} />
                        </div>
                        <span className="text-sm font-bold">Combo</span>
                      </button>
                      <button
                        onClick={() => {
                          setNewContractType('Single');
                          setSelectedOption('');
                          setSelectedRoadmapCourses([]);
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          newContractType === 'Single' 
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newContractType === 'Single' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                          <BookOpen size={16} />
                        </div>
                        <span className="text-sm font-bold">Single</span>
                      </button>
                    </div>
                  </div>

                  {/* Conditional Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      {newContractType === 'Combo' ? 'Chọn lộ trình (Roadmap)' : 'Chọn khóa học lẻ (Single)' }
                    </label>
                    <div className="relative">
                      <select
                        value={selectedOption}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedOption(val);
                          if (newContractType === 'Combo' && roadmapDetails[val]) {
                            setSelectedRoadmapCourses(roadmapDetails[val]);
                          } else {
                            setSelectedRoadmapCourses([]);
                          }
                        }}
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
                      >
                        <option value="" disabled>-- Vui lòng chọn --</option>
                        {(newContractType === 'Combo' ? roadmaps : singleCourses).map((item, i) => (
                          <option key={i} value={item}>{item}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Roadmap Course List */}
                  {newContractType === 'Combo' && selectedOption && roadmapDetails[selectedOption] && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khóa học trong lộ trình (Chọn nhiều)</label>
                        <span className="text-[10px] text-indigo-600 font-bold">{selectedRoadmapCourses.length}/{roadmapDetails[selectedOption].length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {roadmapDetails[selectedOption].map((courseId, idx) => {
                          const isSelected = selectedRoadmapCourses.includes(courseId);
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedRoadmapCourses(selectedRoadmapCourses.filter(c => c !== courseId));
                                } else {
                                  setSelectedRoadmapCourses([...selectedRoadmapCourses, courseId]);
                                }
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                                isSelected 
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200'
                              }`}
                            >
                              <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300'}`} />
                              {courseId}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Info Alert */}
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                    <div className="w-5 h-5 bg-amber-100 text-amber-600 rounded flex items-center justify-center shrink-0 mt-0.5">
                      <Bell size={12} />
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Hệ thống sẽ tự động tính toán học phí dựa trên {newContractType === 'Combo' ? 'lộ trình' : 'khóa học'} đã chọn. Bạn có thể điều chỉnh chiết khấu sau khi lưu nháp.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-colors"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={() => {
                      const newContract: Contract = {
                        id: Math.random().toString(36).substr(2, 9),
                        contractNumber: `HD-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                        type: newContractType,
                        totalFee: newContractType === 'Combo' ? 35000000 : 12000000,
                        paidAmount: 0,
                        status: 'Pending',
                        date: new Date().toISOString().split('T')[0],
                        discount: 0,
                        transferAmount: 0,
                        lateEntryDeduction: 0,
                        courses: newContractType === 'Combo' 
                          ? selectedRoadmapCourses.map(id => ({ id, fee: Math.floor(35000000 / selectedRoadmapCourses.length) }))
                          : [{ id: selectedOption, fee: 12000000 }],
                        paymentPeriods: [
                          { id: 'p-new-1', dueDate: new Date().toISOString().split('T')[0], amount: newContractType === 'Combo' ? 17500000 : 6000000, status: 'Unpaid' }
                        ],
                        history: [
                          { 
                            id: 'h-new', 
                            updateTime: new Date().toLocaleString(), 
                            updatedBy: 'Staff Current', 
                            action: 'Tạo hợp đồng', 
                            details: `Tạo mới hợp đồng ${newContractType}: ${selectedOption}${newContractType === 'Combo' ? ` (Khóa học: ${selectedRoadmapCourses.join(', ')})` : ''}` 
                          }
                        ]
                      };
                      
                      setSelectedContract(newContract);
                      setActiveView('contract-detail');
                      setIsCreateModalOpen(false);
                    }}
                    disabled={!selectedOption || (newContractType === 'Combo' && selectedRoadmapCourses.length === 0)}
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:shadow-none"
                  >
                    Lưu hợp đồng
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Student Header Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <User size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">Van Thanh Van Thanh</h2>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">Draft</span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                <span className="flex items-center gap-1 font-medium">ID: <span className="text-slate-900">26VP1</span></span>
                <span className="flex items-center gap-1"><Phone size={14} /> 123456789</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <Settings size={16} />
            Chỉnh sửa
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-8">
          {[
            { id: 'info', label: 'Thông tin học viên' },
            { id: 'entrance-test', label: 'Kiểm tra đầu vào' },
            { id: 'roadmap', label: 'Lộ trình' },
            { id: 'contract', label: 'Hợp đồng' },
            { id: 'journal', label: 'Learning Journey' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Entrance Test Content */}
        {activeTab === 'entrance-test' && (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kết quả kiểm tra đầu vào</h3>
                  <p className="text-sm text-slate-500">Học viên có 2 lần kiểm tra đầu vào.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsAddPTModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-950 transition-colors"
                  >
                    <Plus size={16} />
                    Thêm lần kiểm tra
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <Settings size={16} />
                    Chỉnh sửa lần này
                  </button>
                </div>
              </div>

              <AddPlacementTestModal 
                isOpen={isAddPTModalOpen} 
                onClose={() => setIsAddPTModalOpen(false)} 
              />

              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                  Lần 2 • 13/03/2026
                </span>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full border border-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  Lần 1 • 13/03/2026
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'SPEAKING', score: '6.5/9.0', icon: '🗣️', color: 'amber' },
                    { label: 'LISTENING', score: '7.0/9.0', icon: '🎧', color: 'indigo' },
                    { label: 'WRITING', score: '6.0/9.0', icon: '✍️', color: 'violet' },
                    { label: 'GRAMMAR & VOCABULARY', score: '75% Accuracy', icon: '📖', color: 'emerald' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center text-xl`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-xl font-bold text-slate-900">{item.score}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="sm:col-span-2 bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center">
                        <Mail size={14} />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Nhận xét kết quả kiểm tra đầu vào</p>
                    </div>
                    <p className="text-sm text-slate-600">test</p>
                  </div>
                </div>

                <div className="bg-indigo-900 rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">OVERALL</p>
                    <h4 className="text-5xl font-bold mt-2">78/120</h4>
                  </div>
                  <div className="relative z-10 mt-12">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">LEVEL ĐẦU VÀO</p>
                    <h4 className="text-2xl font-bold mt-1">IE.Starter</h4>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full"></div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Lộ trình học tập</h3>
                  <p className="text-sm text-slate-500">Các khóa học được đề xuất dựa trên kết quả kiểm tra đầu vào.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-950 transition-colors">
                  <Plus size={16} />
                  Thêm khóa học
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/50 p-4">
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KẾT QUẢ ĐẦU VÀO</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">IE.Starter</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KHÓA HỌC MỤC TIÊU</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">IE.Found1</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">THÔNG SỐ LỘ TRÌNH</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded">Nháp</span>
                      <span className="text-xs text-slate-500">Tổng khóa: <span className="font-bold text-slate-900">4</span></span>
                      <span className="text-xs text-slate-500">Tổng giờ: <span className="font-bold text-slate-900">256.0</span></span>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex items-center justify-center gap-4 overflow-x-auto">
                  {[
                    { name: 'IELTS Starter', range: '(0.0 - 3.0)', code: 'IE.STARTER', active: false },
                    { name: 'Pre IELTS 1', range: '(3.0 - 4.0)', code: 'IE.PRE1', active: false },
                    { name: 'Pre IELTS 2', range: '(4.0 - 5.0)', code: 'IE.PRE2', active: false },
                    { name: 'IELTS Foundation 1', range: '(5.0 - 5.5)', code: 'IE.FOUND1', active: true },
                  ].map((course, i, arr) => (
                    <React.Fragment key={i}>
                      <div className={`shrink-0 w-48 p-4 rounded-xl border-2 transition-all ${
                        course.active ? 'border-amber-400 bg-amber-50/30' : 'border-slate-100 bg-white'
                      }`}>
                        <p className="text-sm font-bold text-slate-900">{course.name}</p>
                        <p className="text-[10px] font-bold text-red-500 mt-1">{course.range}</p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase">{course.code}</p>
                        <div className="flex items-center gap-1 mt-3">
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                          <span className="text-[10px] text-slate-400 font-medium">Dự kiến</span>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-8 h-px bg-slate-200 shrink-0"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-900 text-white">
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Khóa học</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Số giờ</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Thời lượng khóa học</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Học phí (Dự kiến)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'IE.Starter', hours: '64', duration: 'Ước tính 2-3 tháng / khóa', fee: 'Theo bảng học phí khóa IE.Starter' },
                        { name: 'IE.Pre1', hours: '64', duration: 'Ước tính 2-3 tháng / khóa', fee: 'Theo bảng học phí khóa IE.Pre1' },
                        { name: 'IE.Pre2', hours: '64', duration: 'Ước tính 2-3 tháng / khóa', fee: 'Theo bảng học phí khóa IE.Pre2' },
                        { name: 'IE.Found1', hours: '64', duration: 'Ước tính 2-3 tháng / khóa', fee: 'Theo bảng học phí khóa IE.Found1' },
                      ].map((row, i) => (
                        <tr key={i} className="text-sm">
                          <td className="px-6 py-4 font-bold text-slate-700">{row.name}</td>
                          <td className="px-6 py-4 text-slate-600"><span className="font-bold text-slate-900">{row.hours}</span> giờ học chính</td>
                          <td className="px-6 py-4 text-slate-600">{row.duration}</td>
                          <td className="px-6 py-4 text-slate-400 italic">{row.fee}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50/80 font-bold text-sm">
                        <td className="px-6 py-4 text-slate-900">Tổng lộ trình</td>
                        <td className="px-6 py-4 text-amber-600">256 giờ học chính</td>
                        <td className="px-6 py-4 text-slate-700">Ước tính 4 khóa • thời lượng phụ thuộc lịch khai giảng</td>
                        <td className="px-6 py-4 text-slate-400 italic">Sẽ tính theo bảng học phí từng khóa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Contract Content */}
        {activeTab === 'contract' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Danh sách hợp đồng</h3>
                <p className="text-sm text-slate-500">Quản lý các hợp đồng đào tạo của học viên.</p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                <Plus size={16} />
                Tạo hợp đồng
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Số hợp đồng</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại hợp đồng</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng học phí</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Đã thanh toán</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Còn lại</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_CONTRACTS.map((contract) => (
                      <tr 
                        key={contract.id} 
                        onClick={() => handleContractClick(contract)}
                        className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-indigo-600">{contract.contractNumber}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{contract.date}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            contract.type === 'Combo' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {contract.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-900">{contract.totalFee.toLocaleString('vi-VN')} đ</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-emerald-600">{contract.paidAmount.toLocaleString('vi-VN')} đ</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-red-500">{(contract.totalFee - contract.paidAmount).toLocaleString('vi-VN')} đ</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            contract.status === 'Signed' ? 'bg-emerald-100 text-emerald-700' :
                            contract.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {contract.status === 'Signed' ? 'Đã ký' : 
                             contract.status === 'Pending' ? 'Chờ ký' : 'Hết hạn'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Journey Content */}
        {activeTab === 'journal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {(() => {
              const journeyData = [
                { 
                  courseId: 'IE-FOUND-01', 
                  contract: 'HD-2024-001',
                  classId: 'IELTS-INT-01', 
                  totalHoursEstimate: 64,
                  progressActual: 20,
                  totalHoursActual: 40,
                  courseFee: 10000000,
                  discount: 1000000,
                  totalLessons: 32,
                  startDate: '01/03/2024',
                  endDate: '01/06/2024',
                  status: 'OnGoing' 
                },
                { 
                  courseId: 'IE-PRE-02', 
                  contract: 'HD-2024-001',
                  classId: 'IELTS-INT-02', 
                  totalHoursEstimate: 64,
                  progressActual: 64,
                  totalHoursActual: 64,
                  courseFee: 8000000,
                  discount: 500000,
                  totalLessons: 32,
                  startDate: '15/01/2024',
                  endDate: '15/04/2024',
                  status: 'Done' 
                },
                { 
                  courseId: 'TOEIC-BASIC', 
                  contract: 'HD-2024-042',
                  classId: null, 
                  totalHoursEstimate: 48,
                  progressActual: 0,
                  totalHoursActual: 0,
                  courseFee: 5000000,
                  discount: 0,
                  totalLessons: 24,
                  startDate: '-',
                  endDate: '-',
                  status: 'Not Started' 
                },
              ];

              const totalHoursLearned = journeyData.reduce((sum, item) => sum + item.progressActual, 0);
              const totalHoursRequired = journeyData.reduce((sum, item) => sum + item.totalHoursEstimate, 0);
              const overallProgress = totalHoursRequired > 0 ? (totalHoursLearned / totalHoursRequired) * 100 : 0;

              // Calculate financial totals
              const totalRecognizedRevenue = journeyData.reduce((sum, item) => {
                const finalFee = item.courseFee - item.discount;
                const lessonsCompleted = (item.progressActual / (item.totalHoursEstimate / item.totalLessons)) || 0;
                const recognized = (finalFee / item.totalLessons) * lessonsCompleted;
                return sum + recognized;
              }, 0);

              const totalUnearnedRevenue = journeyData.reduce((sum, item) => {
                const finalFee = item.courseFee - item.discount;
                const lessonsCompleted = (item.progressActual / (item.totalHoursEstimate / item.totalLessons)) || 0;
                const recognized = (finalFee / item.totalLessons) * lessonsCompleted;
                return sum + (finalFee - recognized);
              }, 0);

              return (
                <div className="space-y-6">
                  {/* KPI Cards Section */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Card 1: Total Learned */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Learned</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <h4 className="text-2xl font-bold text-slate-900">{totalHoursLearned}h</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic">Dựa trên tiến độ thực tế</p>
                    </div>

                    {/* Card 2: Overall Progress */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Progress</p>
                      <div className="flex items-end justify-between mt-1">
                        <h4 className="text-2xl font-bold text-slate-900">{Math.round(overallProgress)}%</h4>
                        <p className="text-[10px] font-bold text-slate-400 mb-1">{totalHoursLearned}h / {totalHoursRequired}h</p>
                      </div>
                    </div>

                    {/* Card 3: Recognized Revenue */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recognized Revenue</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <h4 className="text-2xl font-bold text-emerald-600">{totalRecognizedRevenue.toLocaleString('vi-VN')} đ</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic">Doanh thu đã ghi nhận</p>
                    </div>

                    {/* Card 4: Unearned Revenue */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unearned Revenue</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <h4 className="text-2xl font-bold text-amber-600">{totalUnearnedRevenue.toLocaleString('vi-VN')} đ</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic">Doanh thu chưa thực hiện</p>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900">Learning Journey (Nhật ký học tập)</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#303B70] text-white">
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Course ID</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Contract</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Class ID</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Total Hours (Est)</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Progress</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Total Hours (Act)</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider text-right">Final Fee</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider text-right">Revenue (Rec)</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider text-right">Unearned Rev</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Start Date</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">End Date</th>
                            <th className="px-3 py-4 text-[10px] font-bold uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {journeyData.map((item, index) => {
                            const finalFee = item.courseFee - item.discount;
                            const hoursPerLesson = item.totalHoursEstimate / item.totalLessons;
                            const lessonsCompleted = (item.progressActual / hoursPerLesson) || 0;
                            const recognizedRevenue = (finalFee / item.totalLessons) * lessonsCompleted;
                            const unearnedRevenue = finalFee - recognizedRevenue;

                            return (
                              <tr key={index} className="hover:bg-gray-50 transition-colors group text-xs">
                                <td className="px-3 py-4 font-bold text-indigo-600 uppercase">{item.courseId}</td>
                                <td className="px-3 py-4 text-slate-600">{item.contract}</td>
                                <td className="px-3 py-4 font-bold text-slate-900">
                                  {item.status === 'Not Started' ? (
                                    <span className="text-slate-400 italic font-normal">Chưa xếp lớp</span>
                                  ) : (
                                    item.classId
                                  )}
                                </td>
                                <td className="px-3 py-4 text-slate-900 font-medium text-center">{item.totalHoursEstimate}h</td>
                                <td className="px-3 py-4 text-indigo-600 font-bold text-center">{item.progressActual}h</td>
                                <td className="px-3 py-4 text-slate-900 font-medium text-center">{item.totalHoursActual}h</td>
                                <td className="px-3 py-4 text-slate-900 font-bold text-right">
                                  <div className="group relative cursor-help">
                                    {finalFee.toLocaleString('vi-VN')}
                                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl z-50">
                                      Formula: Course Fee - Discount
                                      <br />
                                      {item.courseFee.toLocaleString()} - {item.discount.toLocaleString()}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-indigo-600 font-bold text-right">
                                  <div className="group relative cursor-help">
                                    {Math.round(recognizedRevenue).toLocaleString('vi-VN')}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl z-50">
                                      Formula: (Final Fee / Total Lessons) * Lessons Completed
                                      <br />
                                      ({finalFee.toLocaleString()} / {item.totalLessons}) * {lessonsCompleted.toFixed(1)}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-amber-600 font-bold text-right">{Math.round(unearnedRevenue).toLocaleString('vi-VN')}</td>
                                <td className="px-3 py-4 text-slate-600">{item.startDate}</td>
                                <td className="px-3 py-4 text-slate-600">{item.endDate}</td>
                                <td className="px-3 py-4">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                    item.status === 'OnGoing' ? 'bg-blue-100 text-blue-700' :
                                    item.status === 'Done' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-200 text-gray-600'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-20"
      >
        <div className="p-6 flex items-center gap-3 border-bottom border-slate-100">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
            <GraduationCap size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight text-indigo-950"
            >
              EnglishHub
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Tổng quan" />
          <NavItem id="students" icon={Users} label="Quản lý học viên" />
          <NavItem id="classes" icon={School} label="Quản lý lớp học" />
          <NavItem id="courses" icon={BookOpen} label="Khóa học" />
          <NavItem id="teachers" icon={GraduationCap} label="Giảng viên" />
          <NavItem id="finance" icon={DollarSign} label="Finance" />
          <NavItem id="schedule" icon={Calendar} label="Lịch học" />
          <NavItem id="reports" icon={BarChart3} label="Báo cáo" />
          <NavItem id="permissions" icon={ShieldCheck} label="Phân quyền" />
          <div className="pt-4 mt-4 border-t border-slate-100">
            <NavItem id="settings" icon={Settings} label="Cài đặt" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>Đăng xuất</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
            >
              <ChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveView('students')}
                className={`text-lg font-semibold transition-colors ${activeView === 'student-detail' || activeView === 'teacher-detail' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-800'}`}
              >
                {activeView === 'teachers' || activeView === 'teacher-detail' ? 'Giảng viên' : 
                 activeView === 'finance' ? 'Finance' :
                 activeView === 'classes' ? 'Quản lý lớp học' :
                 activeView === 'courses' ? 'Khóa học' :
                 activeView === 'schedule' ? 'Lịch học' :
                 activeView === 'reports' ? 'Báo cáo' :
                 activeView === 'permissions' ? 'Quản lý phân quyền' :
                 'Quản lý học viên'}
              </button>
              {(activeView === 'student-detail' || activeView === 'teacher-detail') && (
                <>
                  <ChevronRight size={16} className="text-slate-300" />
                  <span className="text-lg font-semibold text-slate-800">
                    {activeView === 'teacher-detail' ? 'Chi tiết giảng viên' : 'Chi tiết học viên'}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold leading-none">Admin User</p>
                <p className="text-[10px] text-slate-500 mt-1">Quản trị viên</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 overflow-auto">
          <AnimatePresence mode="wait">
            {activeView === 'students' ? (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Tổng học viên', value: '1,284', change: '+12%', icon: Users, color: 'indigo' },
                    { label: 'Đang hoạt động', value: '856', change: '+5%', icon: GraduationCap, color: 'emerald' },
                    { label: 'Học viên mới', value: '42', change: '+18%', icon: Plus, color: 'amber' },
                    { label: 'Tỷ lệ duy trì', value: '94%', change: '+2%', icon: BarChart3, color: 'rose' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                          <stat.icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Tìm theo tên hoặc email..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={16} />
                        Bộ lọc
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Download size={16} />
                        Xuất file
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                        <Plus size={16} />
                        Thêm học viên
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Học viên</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Khóa học</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày tham gia</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((student) => (
                          <tr 
                            key={student.id} 
                            onClick={() => handleStudentClick(student)}
                            className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                  {student.name.split(' ').pop()?.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                      <Mail size={12} /> {student.email}
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                      <Phone size={12} /> {student.phone}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-slate-600 font-medium">{student.course}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-slate-500">{student.joinDate}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                student.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {student.status === 'Active' ? 'Đang học' : 
                                 student.status === 'Pending' ? 'Chờ lớp' : 'Nghỉ học'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                <MoreVertical size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      Hiển thị <span className="font-bold text-slate-900">1-6</span> trong số <span className="font-bold text-slate-900">1,284</span> học viên
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm disabled:opacity-50" disabled>Trước</button>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-bold">1</button>
                      <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">2</button>
                      <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">3</button>
                      <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Sau</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeView === 'finance' ? (
              <FinanceView />
            ) : activeView === 'classes' ? (
              <ClassesView />
            ) : activeView === 'teachers' ? (
              <TeachersView />
            ) : activeView === 'teacher-detail' && selectedTeacher ? (
              <TeacherDetailView 
                teacher={selectedTeacher} 
                onBack={() => setActiveView('teachers')} 
              />
            ) : activeView === 'class-detail' && selectedClass ? (
              <ClassDetailView 
                cls={selectedClass} 
                onBack={() => setActiveView('classes')} 
              />
            ) : activeView === 'student-detail' ? (
              <StudentDetailView />
            ) : activeView === 'contract-detail' && selectedContract ? (
              <ContractDetailView 
                contract={selectedContract} 
                onBack={() => setActiveView('student-detail')} 
              />
            ) : activeView === 'permissions' ? (
              <PermissionManagementView />
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-slate-400"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <LayoutDashboard size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-600">Tính năng đang phát triển</h2>
                <p className="text-sm mt-2">Vui lòng chọn "Quản lý học viên" để xem giao diện mẫu.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
