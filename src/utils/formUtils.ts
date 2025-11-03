import { Applicant } from './dataService';

export const fieldsToCapitalize = [
  'firstName',
  'middleName',
  'lastName',
  'extensionName',
  'barangay',
  'idNumber',
  'occupation',
  'dependentName',
  'relationshipToDependent',
  'beneficiaryName',
  'school',
  'placeOfBirth'
];

export const capitalizeValue = (field: string, value: any): any => {
  if (fieldsToCapitalize.includes(field) && typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
};

export const formatContactNumber = (value: string): string => {
  let formattedValue = value.replace(/[^0-9]/g, '');

  if (formattedValue.length > 11) {
    formattedValue = formattedValue.slice(0, 11);
  }

  if (formattedValue.length > 0) {
    let formatted = formattedValue;
    if (formattedValue.length > 4) {
      formatted = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
    }
    if (formattedValue.length > 7) {
      formatted = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4, 7) + '-' + formattedValue.slice(7);
    }
    return formatted;
  }
  return formattedValue;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const truncateFileName = (fileName: string, maxLength: number = 15): string => {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.substring(0, maxLength - 3 - (extension?.length || 0));
  return `${truncatedName}...${extension}`;
};

export const downloadFile = (fileName: string, fileData: string): void => {
  const link = document.createElement('a');
  link.href = fileData;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const initializeFormData = (applicant: Applicant | null) => {
  if (!applicant) {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      extensionName: '',
      birthDate: '',
      age: '',
      placeOfBirth: '',
      barangay: '',
      contactNumber: '',
      telephoneNumber: '',
      email: '',
      school: '',
      civilStats: '',
      gender: 'MALE' as 'MALE' | 'FEMALE',
      educationalAttainment: '',
      course: '',
      beneficiaryName: '',
      status: 'PENDING' as 'PENDING' | 'APPROVED' | 'DEPLOYED' | 'COMPLETED' | 'REJECTED' | 'RESIGNED',
      idType: '',
      idNumber: '',
      occupation: '',
      civilStatus: '',
      averageMonthlyIncome: '',
      dependentName: '',
      relationshipToDependent: '',
      resumeFile: null as File | null,
      photoFile: null as File | null,
      photoFileName: '',
      photoFileData: ''
    };
  }

  return {
    firstName: applicant.firstName,
    middleName: applicant.middleName || '',
    lastName: applicant.lastName,
    extensionName: applicant.extensionName || '',
    birthDate: applicant.birthDate,
    age: applicant.age.toString(),
    placeOfBirth: applicant.placeOfBirth || '',
    barangay: applicant.barangay,
    contactNumber: applicant.contactNumber,
    telephoneNumber: applicant.telephoneNumber || '',
    email: applicant.email || '',
    school: applicant.school || '',
    civilStats: applicant.civilStats || '',
    gender: applicant.gender,
    educationalAttainment: applicant.educationalAttainment,
    course: applicant.course || '',
    beneficiaryName: applicant.beneficiaryName || '',
    status: applicant.status,
    idType: applicant.idType || '',
    idNumber: applicant.idNumber || '',
    occupation: applicant.occupation || '',
    civilStatus: applicant.civilStatus || '',
    averageMonthlyIncome: applicant.averageMonthlyIncome || '',
    dependentName: applicant.dependentName || '',
    relationshipToDependent: applicant.relationshipToDependent || '',
    resumeFile: null as File | null,
    photoFile: null as File | null,
    photoFileName: applicant.photoFileName || '',
    photoFileData: applicant.photoFileData || ''
  };
};
