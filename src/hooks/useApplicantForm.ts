import { useState } from 'react';
import { Applicant, calculateAge } from '../utils/dataService';
import {
  initializeFormData,
  capitalizeValue,
  fileToBase64
} from '../utils/formUtils';
import {
  validateRequiredFields,
  validateAge,
  showSuccessMessage,
  showErrorMessage
} from '../utils/validationUtils';

export const useApplicantForm = (
  activeProgram: 'GIP' | 'TUPAD',
  addApplicant: any,
  updateApplicant: any,
  applicantCode: string
) => {
  const [formData, setFormData] = useState(initializeFormData(null));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    const capitalizedValue = capitalizeValue(field, value);
    setFormData(prev => ({ ...prev, [field]: capitalizedValue }));
  };

  const resetForm = () => {
    setFormData(initializeFormData(null));
  };

  const loadApplicantData = (applicant: Applicant) => {
    setFormData(initializeFormData(applicant));
  };

  const handleSubmit = async (
    e: React.FormEvent,
    editingApplicant: Applicant | null,
    onSuccess: () => void
  ) => {
    e.preventDefault();

    const isValid = await validateRequiredFields(formData, activeProgram);
    if (!isValid) return;

    const ageValid = await validateAge(formData.birthDate, activeProgram);
    if (!ageValid) return;

    setIsSubmitting(true);

    try {
      const age = calculateAge(formData.birthDate);

      if (editingApplicant) {
        let resumeFileName = editingApplicant.resumeFileName;
        let resumeFileData = editingApplicant.resumeFileData;
        let photoFileName = editingApplicant.photoFileName;
        let photoFileData = editingApplicant.photoFileData;

        if (formData.resumeFile) {
          resumeFileName = formData.resumeFile.name;
          resumeFileData = await fileToBase64(formData.resumeFile);
        }

        if (formData.photoFile) {
          photoFileName = formData.photoFile.name;
          photoFileData = await fileToBase64(formData.photoFile);
        }

        const updatedApplicant: Applicant = {
          ...editingApplicant,
          firstName: formData.firstName,
          middleName: formData.middleName || undefined,
          lastName: formData.lastName,
          extensionName: formData.extensionName || undefined,
          birthDate: formData.birthDate,
          age,
          placeOfBirth: formData.placeOfBirth || '',
          barangay: formData.barangay,
          contactNumber: formData.contactNumber,
          telephoneNumber: formData.telephoneNumber || '',
          email: formData.email || undefined,
          school: formData.school || undefined,
          civilStats: formData.civilStats || '',
          gender: formData.gender,
          educationalAttainment: formData.educationalAttainment || '',
          course: formData.course || '',
          beneficiaryName: formData.beneficiaryName || undefined,
          code: applicantCode,
          status: formData.status,
          program: activeProgram,
          resumeFileName,
          resumeFileData,
          photoFileName,
          photoFileData,
          idType: activeProgram === 'TUPAD' ? formData.idType : undefined,
          idNumber: activeProgram === 'TUPAD' ? formData.idNumber : undefined,
          occupation: activeProgram === 'TUPAD' ? formData.occupation : undefined,
          civilStatus: activeProgram === 'TUPAD' ? formData.civilStatus : undefined,
          averageMonthlyIncome: activeProgram === 'TUPAD' ? formData.averageMonthlyIncome : undefined,
          dependentName: activeProgram === 'TUPAD' ? formData.dependentName : undefined,
          relationshipToDependent: activeProgram === 'TUPAD' ? formData.relationshipToDependent : undefined
        };

        await updateApplicant(updatedApplicant);
        await showSuccessMessage(true);
      } else {
        let resumeFileName: string | undefined;
        let resumeFileData: string | undefined;
        let photoFileName: string | undefined;
        let photoFileData: string | undefined;

        if (formData.resumeFile) {
          resumeFileName = formData.resumeFile.name;
          resumeFileData = await fileToBase64(formData.resumeFile);
        }

        if (formData.photoFile) {
          photoFileName = formData.photoFile.name;
          photoFileData = await fileToBase64(formData.photoFile);
        }

        const applicantData: Omit<Applicant, 'id' | 'dateSubmitted'> = {
          firstName: formData.firstName,
          middleName: formData.middleName || undefined,
          lastName: formData.lastName,
          extensionName: formData.extensionName || undefined,
          birthDate: formData.birthDate,
          age,
          placeOfBirth: formData.placeOfBirth || '',
          barangay: formData.barangay,
          contactNumber: formData.contactNumber,
          telephoneNumber: formData.telephoneNumber || '',
          email: formData.email || undefined,
          school: formData.school || undefined,
          civilStats: formData.civilStats || '',
          gender: formData.gender,
          educationalAttainment: formData.educationalAttainment || '',
          course: formData.course || '',
          beneficiaryName: formData.beneficiaryName || undefined,
          code: applicantCode,
          encoder: 'Administrator',
          status: formData.status,
          program: activeProgram,
          resumeFileName,
          resumeFileData,
          photoFileName,
          photoFileData,
          idType: activeProgram === 'TUPAD' ? formData.idType : undefined,
          idNumber: activeProgram === 'TUPAD' ? formData.idNumber : undefined,
          occupation: activeProgram === 'TUPAD' ? formData.occupation : undefined,
          civilStatus: activeProgram === 'TUPAD' ? formData.civilStatus : undefined,
          averageMonthlyIncome: activeProgram === 'TUPAD' ? formData.averageMonthlyIncome : undefined,
          dependentName: activeProgram === 'TUPAD' ? formData.dependentName : undefined,
          relationshipToDependent: activeProgram === 'TUPAD' ? formData.relationshipToDependent : undefined
        };

        await addApplicant(applicantData);
        await showSuccessMessage(false);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving applicant:', error);
      await showErrorMessage();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
    loadApplicantData
  };
};
