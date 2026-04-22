/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: 'Official' | 'Trial' | 'Pending' | 'Active' | 'Inactive';
  joinDate: string;
}

export interface PaymentPeriod {
  id: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface ContractHistory {
  id: string;
  updateTime: string;
  updatedBy: string;
  action: string;
  details: string;
}

export interface ContractCourse {
  id: string;
  fee: number;
}

export interface Contract {
  id: string;
  contractNumber: string;
  type: 'Combo' | 'Single';
  totalFee: number;
  paidAmount: number;
  status: 'Signed' | 'Pending' | 'Expired';
  date: string;
  discount?: number;
  transferAmount?: number;
  lateEntryDeduction?: number;
  paymentPeriods?: PaymentPeriod[];
  history?: ContractHistory[];
  courses?: ContractCourse[];
}

export interface Class {
  id: string;
  name: string;
  course: string;
  teacher: string;
  schedule: string; // e.g., "Mon, Wed, Fri"
  time: string; // e.g., "18:00 - 20:00"
  startDate: string;
  endDate: string;
  room: string;
  status: 'OnGoing' | 'PreOpening' | 'Stopped';
  studentCount: number;
  currentLesson: number;
  totalLessons: number;
  level?: string;
  scStaff?: string;
  weeklySchedule?: { day: string; time: string }[];
  courseBook?: string;
  supplementaryMaterials?: { category: string; items: { label: string; link?: string }[] }[];
  learningOutcomes?: { skill: string; target: string }[];
}

export interface PlacementTest {
  id: string;
  courseName: string;
  testCode: string;
  ptResult: {
    level: string;
    courseId: string;
  };
  outputResult: {
    level: string;
    courseId: string;
  };
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
  grammarVocab: string;
  overall: string;
  teacherComment: string;
  note: string;
  date: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export type AccessLevel = 'none' | 'view' | 'full';

export interface Permission {
  id: string;
  module: string;
  feature: string;
  accessLevel: AccessLevel;
}

export type ViewType = 'dashboard' | 'students' | 'student-detail' | 'contract-detail' | 'class-detail' | 'classes' | 'courses' | 'teachers' | 'teacher-detail' | 'schedule' | 'reports' | 'settings' | 'finance' | 'permissions';
