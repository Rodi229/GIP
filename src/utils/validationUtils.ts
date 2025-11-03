import Swal from 'sweetalert2';
import { calculateAge } from './dataService';

export interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  barangay: string;
  contactNumber: string;
  educationalAttainment: string;
  idType?: string;
  [key: string]: any;
}

export const validateRequiredFields = async (
  formData: FormData,
  activeProgram: 'GIP' | 'TUPAD'
): Promise<boolean> => {
  if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.barangay || !formData.contactNumber) {
    await Swal.fire({
      icon: 'error',
      title: 'Missing Required Fields',
      text: 'Please fill in all required fields',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
    return false;
  }

  if (activeProgram === 'GIP' && !formData.educationalAttainment) {
    await Swal.fire({
      icon: 'error',
      title: 'Missing Required Fields',
      text: 'Please fill in all required fields',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
    return false;
  }

  if (activeProgram === 'TUPAD' && !formData.idType) {
    await Swal.fire({
      icon: 'error',
      title: 'Missing Required Fields',
      text: 'Please fill in all required fields',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
    return false;
  }

  return true;
};

export const validateAge = async (
  birthDate: string,
  activeProgram: 'GIP' | 'TUPAD'
): Promise<boolean> => {
  const age = calculateAge(birthDate);

  if (activeProgram === 'GIP' && (age < 18 || age > 29)) {
    await Swal.fire({
      icon: 'error',
      title: 'Age Requirement Not Met',
      text: 'GIP applicants must be between 18-29 years old',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
    return false;
  }

  if (activeProgram === 'TUPAD' && (age < 25 || age > 58)) {
    await Swal.fire({
      icon: 'error',
      title: 'Age Requirement Not Met',
      text: 'TUPAD applicants must be between 25-58 years old',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
    return false;
  }

  return true;
};

export const showSuccessMessage = async (isEdit: boolean): Promise<void> => {
  if (isEdit) {
    await Swal.fire({
      icon: 'success',
      title: 'Applicant Updated!',
      text: 'The applicant information has been successfully updated.',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
  } else {
    await Swal.fire({
      icon: 'success',
      title: 'Applicant Added!',
      text: 'The applicant has been successfully added to the system.',
      confirmButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
      }
    });
  }
};

export const showErrorMessage = async (): Promise<void> => {
  await Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Error saving applicant. Please try again.',
    confirmButtonColor: '#3085d6',
    customClass: {
      popup: 'rounded-2xl shadow-lg',
      confirmButton: 'px-5 py-2 rounded-lg text-white font-semibold'
    }
  });
};

export const showCancelConfirmation = async (hasData: boolean): Promise<boolean> => {
  if (!hasData) return true;

  const result = await Swal.fire({
    title: 'Discard Changes?',
    text: 'You have unsaved data. Are you sure you want to cancel?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg',
      confirmButton: 'px-4 py-2 rounded-lg',
      cancelButton: 'px-4 py-2 rounded-lg'
    }
  });

  return result.isConfirmed;
};
