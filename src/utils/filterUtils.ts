import { Applicant } from './dataService';

export interface FilterOptions {
  searchTerm?: string;
  status?: string;
  barangay?: string;
  gender?: string;
  ageRange?: string;
  education?: string;
}

export const BARANGAYS = [
  'All Barangays',
  'APLAYA',
  'BALIBAGO',
  'CAINGIN',
  'DILA',
  'DITA',
  'DON JOSE',
  'IBABA',
  'KANLURAN',
  'LABAS',
  'MACABLING',
  'MALITLIT',
  'MALUSAK',
  'MARKET AREA',
  'POOC',
  'PULONG SANTA CRUZ',
  'SANTO DOMINGO',
  'SINALHAN',
  'TAGAPO'
];

export const STATUSES = [
  'All Status',
  'PENDING',
  'APPROVED',
  'DEPLOYED',
  'COMPLETED',
  'REJECTED',
  'RESIGNED'
];

export const GENDERS = [
  'All Genders',
  'MALE',
  'FEMALE'
];

export const AGE_RANGES = [
  'All Ages',
  '18-25',
  '26-35',
  '36-45',
  '46+'
];

export const EDUCATION_LEVELS = [
  'All Education Levels',
  'JUNIOR HIGH SCHOOL GRADUATE',
  'SENIOR HIGH SCHOOL GRADUATE',
  'HIGH SCHOOL GRADUATE',
  'COLLEGE GRADUATE',
  'TECHNICAL/VOCATIONAL COURSE GRADUATE',
  'ALS SECONDARY GRADUATE',
  'COLLEGE UNDERGRADUATE'
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'APPROVED':
      return 'bg-blue-100 text-blue-800';
    case 'DEPLOYED':
      return 'bg-green-100 text-green-800';
    case 'COMPLETED':
      return 'bg-pink-100 text-pink-800';
    case 'REJECTED':
      return 'bg-orange-100 text-orange-800';
    case 'RESIGNED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const paginateData = <T>(
  data: T[],
  currentPage: number,
  entriesPerPage: number
): {
  currentEntries: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalEntries: number;
} => {
  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = data.slice(startIndex, endIndex);

  return {
    currentEntries,
    totalPages,
    startIndex,
    endIndex,
    totalEntries
  };
};
