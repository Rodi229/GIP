import React from "react";
import { X, Download } from "lucide-react";
import { Applicant } from "../utils/dataService";
import * as XLSX from 'xlsx';

interface ApplicantProfileProps {
  applicant: Applicant;
  onClose: () => void;
}

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant, onClose }) => {
  const [showImageModal, setShowImageModal] = React.useState(false);
  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const profileData = [
      ['DOLE REGIONAL OFFICE ____'],
      ['GOVERNMENT INTERNSHIP PROGRAM (GIP)'],
      ['APPLICATION FORM'],
      [''],
      ['INSTRUCTION TO APPLICANTS:'],
      ['Please fill-out all the required information in this form and attach additional documents, where necessary.'],
      [''],
      ['1. NAME OF APPLICANT:'],
      ['Family Name', 'First Name', 'Middle Name'],
      [applicant.lastName, applicant.firstName, applicant.middleName || ''],
      [''],
      ['2. RESIDENTIAL ADDRESS:'],
      [applicant.barangay],
      [''],
      ['Telephone No.:', applicant.telephoneNumber || '-'],
      ['Mobile Number:', applicant.contactNumber],
      ['E-mail Address:', applicant.email || ''],
      [''],
      ['3. PLACE OF BIRTH (city/province)', applicant.placeOfBirth || '-'],
      [''],
      ['4. DATE OF BIRTH (mm/dd/yyyy)', applicant.birthDate],
      [''],
      ['5. GENDER', applicant.gender === 'MALE' ? 'Male' : 'Female'],
      [''],
      ['6. CIVIL STATUS', applicant.civilStats || '-'],
      [''],
      ['7. EDUCATIONAL ATTAINMENT'],
      ['NAME OF SCHOOL', 'INCLUSIVE DATES', 'DEGREE OR DIPLOMA', 'COURSE'],
      ['', 'From', 'To', '', ''],
      [applicant.school || '', '', '', applicant.educationalAttainment, applicant.course || ''],
      [''],
      [''],
      ['CERTIFICATION: I certify that all information given in this application are complete and accurate to the best of my knowledge. I'],
      ['acknowledge that I have completely read and understood the DOLE-GIP Guidelines as embodied in Administrative Order No. ___,'],
      ['Series of 2013.'],
      [''],
      ['DATE', 'SIGNATURE OF APPLICANT'],
      [applicant.dateSubmitted, ''],
      [''],
      ['FOR DOLE-RO/FO Use only'],
      ['Interviewed and validated by:'],
      [''],
      [''],
      ['NAME and SIGNATURE/Position', 'DATE'],
      [''],
      ['Documents Received:'],
      ['Transcript of Records'],
      ['Barangay Certification'],
      [''],
      ['Endorsed by:'],
      [''],
      ['District/Partylist Representative, where applicable'],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(profileData);

    worksheet['!cols'] = [
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 }
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Application Form');

    const fileName = `${applicant.code}_${applicant.lastName}_${applicant.firstName}_Application.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-8 py-5 flex items-center justify-between rounded-t-xl sticky top-0 z-10 shadow-lg">
          <h2 className="text-2xl font-bold tracking-wide">APPLICANT PROFILE</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportToExcel}
              className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Export to Excel</span>
            </button>
            <button onClick={onClose} className="hover:bg-red-900 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="border-4 border-gray-800 rounded-lg p-8 bg-white shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">DOLE REGIONAL OFFICE ____</h3>
                  <h4 className="font-bold text-lg text-red-700">GOVERNMENT INTERNSHIP PROGRAM (GIP)</h4>
                  <h4 className="font-bold text-md text-gray-700">APPLICATION FORM</h4>
                </div>
              </div>
              
              {applicant.photoFileData && (
                <div className="ml-4 flex flex-col items-center">
                  <div
                    className="border-4 border-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-80 transition"
                    onClick={() => setShowImageModal(true)}
                  >
                    <img
                      src={applicant.photoFileData}
                      alt="Applicant Photo"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-semibold">2x2 PHOTO</p>
                </div>
              )}
            </div>

            <div className="mb-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm font-semibold mb-2 text-blue-900">INSTRUCTION TO APPLICANTS:</p>
              <p className="text-xs text-blue-800">
                Please fill-out all the required information in this form and attach additional documents, where necessary.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-gray-800 p-4">
                <p className="font-bold text-sm mb-3 text-gray-800">1. NAME OF APPLICANT:</p>
                <div className="grid grid-cols-3 gap-4 border-t-2 border-gray-800 pt-3">
                  <div className="border-r-2 border-gray-800 pr-2">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Family Name</p>
                    <p className="font-bold text-gray-900">{applicant.lastName.toUpperCase()}</p>
                  </div>
                  <div className="border-r-2 border-gray-800 pr-2">
                    <p className="text-xs text-gray-600 font-semibold mb-1">First Name</p>
                    <p className="font-bold text-gray-900">{applicant.firstName.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Middle Name</p>
                    <p className="font-bold text-gray-900">{applicant.middleName ? applicant.middleName.toUpperCase() : '-'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 border-2 border-gray-800 p-4">
                  <p className="font-bold text-sm mb-3 text-gray-800">2. RESIDENTIAL ADDRESS:</p>
                  <div className="border-t-2 border-gray-800 pt-3 space-y-3">
                    <div className="min-h-12 border-b border-gray-400">
                      <p className="font-medium text-gray-900">{applicant.barangay.toUpperCase()}</p>
                    </div>
                    <div className="border-b border-gray-400 pb-2">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Telephone No.:</p>
                      <p className="font-medium text-gray-900">{applicant.telephoneNumber || '-'}</p>
                    </div>
                    <div className="border-b border-gray-400 pb-2">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Mobile No.:</p>
                      <p className="font-medium text-gray-900">{applicant.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">E-mail Address:</p>
                      <p className="font-medium text-gray-900">{(applicant.email || '-').toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-gray-800 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-800 mb-2">ATTACH 2x2 PHOTO</p>
                    <p className="text-xs font-semibold text-gray-800 mb-2">WITH NAME AND</p>
                    <p className="text-xs font-semibold text-gray-800 mb-3">SIGNATURE TAKEN WITHIN</p>
                    <p className="text-xs font-semibold text-gray-800 mb-2">THE LAST THREE (3)</p>
                    <p className="text-xs font-semibold text-gray-800">MONTHS</p>
                    {applicant.photoFileData && (
                      <img
                        src={applicant.photoFileData}
                        alt="Applicant Photo"
                        className="w-20 h-20 object-cover mt-3 border border-gray-400 cursor-pointer hover:opacity-80 transition"
                        onClick={() => setShowImageModal(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4">
                <p className="font-bold text-sm mb-3 text-gray-800">3. PLACE OF BIRTH (city/province)</p>
                <div className="border-t-2 border-gray-800 pt-3 min-h-10">
                  <p className="font-medium text-gray-900">{applicant.placeOfBirth ? applicant.placeOfBirth.toUpperCase() : '-'}</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4">
                <p className="font-bold text-sm mb-3 text-gray-800">4. DATE OF BIRTH (mm/dd/yyyy)</p>
                <div className="border-t-2 border-gray-800 pt-3 flex gap-2 items-center">
                  <input type="text" className="border border-gray-400 w-16 text-center" placeholder="mm" value={applicant.birthDate?.split('/')[0] || ''} readOnly />
                  <span>/</span>
                  <input type="text" className="border border-gray-400 w-16 text-center" placeholder="dd" value={applicant.birthDate?.split('/')[1] || ''} readOnly />
                  <span>/</span>
                  <input type="text" className="border border-gray-400 w-24 text-center" placeholder="yyyy" value={applicant.birthDate?.split('/')[2] || ''} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-gray-800 p-4">
                  <p className="font-bold text-sm mb-3 text-gray-800">5. GENDER</p>
                  <div className="border-t-2 border-gray-800 pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={applicant.gender === 'MALE'} readOnly />
                      <label className="text-sm font-medium">Male</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={applicant.gender === 'FEMALE'} readOnly />
                      <label className="text-sm font-medium">Female</label>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-gray-800 p-4">
                  <p className="font-bold text-sm mb-3 text-gray-800">6. CIVIL STATUS</p>
                  <div className="border-t-2 border-gray-800 pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={applicant.civilStats === 'SINGLE'} readOnly />
                      <label className="text-sm font-medium">Single</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={applicant.civilStats === 'MARRIED'} readOnly />
                      <label className="text-sm font-medium">Married</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={applicant.civilStats === 'WIDOW/WIDOWER'} readOnly />
                      <label className="text-sm font-medium">Widow/Widower</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4">
                <p className="font-bold text-sm mb-3 text-gray-800">7. EDUCATIONAL ATTAINMENT</p>
                <div className="border-t-2 border-gray-800 pt-3 overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-800 p-2 text-left text-xs font-bold bg-gray-100">NAME OF SCHOOL</th>
                        <th className="border border-gray-800 p-2 text-center text-xs font-bold bg-gray-100 col-span-2">INCLUSIVE DATES</th>
                        <th className="border border-gray-800 p-2 text-left text-xs font-bold bg-gray-100">DEGREE OR DIPLOMA</th>
                      </tr>
                      <tr>
                        <th className="border border-gray-800 p-2"></th>
                        <th className="border border-gray-800 p-2 text-center text-xs font-semibold bg-gray-50">From</th>
                        <th className="border border-gray-800 p-2 text-center text-xs font-semibold bg-gray-50">To</th>
                        <th className="border border-gray-800 p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-800 p-2 font-medium text-gray-900">{applicant.school ? applicant.school.toUpperCase() : '-'}</td>
                        <td className="border border-gray-800 p-2 text-center text-xs text-gray-600">-</td>
                        <td className="border border-gray-800 p-2 text-center text-xs text-gray-600">-</td>
                        <td className="border border-gray-800 p-2">
                          <div>
                            <p className="text-xs font-semibold text-gray-600">Degree: {applicant.educationalAttainment.toUpperCase()}</p>
                            <p className="text-xs font-semibold text-gray-600">Course: {applicant.course ? applicant.course.toUpperCase() : '-'}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4">
                <p className="font-bold text-sm mb-3 text-gray-800">8. DISADVANTAGED GROUP</p>
                <div className="border-t-2 border-gray-800 pt-3 space-y-2">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">PWDs</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">IPs</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">Victims of Armed Conflict</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">Rebel Returnee</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">4Ps</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-sm font-medium">Others:</label>
                      <input type="text" className="border border-gray-400 w-20 text-xs px-1" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4 mt-8">
                <p className="text-xs mb-4 text-gray-700 leading-relaxed">
                  <span className="font-bold">CERTIFICATION:</span> Certify that all information provided in this application, including the attached documents, is complete and accurate to the best of my knowledge. I attest to the veracity of the attached requirements. I understand and agree that any misrepresentation in this document or its attachments may result in disqualification, cancellation of the service or contract, and the forfeiture of any refunds received or pay damages to DOLE or comply with any other sanctions in accordance with the law.
                </p>
                <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-800 pt-4">
                  <div>
                    <p className="text-xs text-gray-600 font-bold mb-2">Signature of Applicant</p>
                    <div className="border-b-2 border-gray-800 h-12"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-bold mb-2">Date Accomplished</p>
                    <p className="font-medium text-gray-900">{applicant.dateSubmitted}</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4 mt-8 bg-gray-50">
                <p className="text-center font-bold text-sm mb-4 text-gray-900">FOR DOLE-RO/FO Use Only</p>

                <div className="mb-4">
                  <p className="text-sm font-bold mb-2 text-gray-800">Interviewed and validated by:</p>
                  <div className="border-b-2 border-gray-800 h-16 mb-2"></div>
                  <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-800 pt-2 mt-2">
                    <div>
                      <p className="text-xs text-gray-600 font-bold">NAME and SIGNATURE/Position</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-bold">DATE</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-gray-800">
                  <p className="text-sm font-bold mb-3 text-gray-800">Documents Received:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Birth certificate or equivalent</label>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Transcript of Records</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Barangay Certification</label>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Form 137/138</label>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Diploma</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" readOnly />
                        <label className="text-xs font-medium">Certification from school or any docs equivalent hereto</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" readOnly />
                      <label className="text-xs font-medium">Others: <input type="text" className="border border-gray-400 w-40 text-xs px-1" readOnly /></label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-gray-800">
                  <p className="text-xs font-bold text-gray-800 mb-2">DOLE REGIONAL OFFICE NO. _____</p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-4 mt-8 bg-gray-50">
                <p className="text-center font-bold text-sm mb-4 text-gray-900">In case of Emergency, please notify:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-800 mb-2">Name:</p>
                    <div className="border-b-2 border-gray-800 h-8"></div>
                    <p className="text-xs font-bold text-gray-800 mt-3 mb-2">Contact Details:</p>
                    <div className="border-b-2 border-gray-800 h-8"></div>
                    <p className="text-xs font-bold text-gray-800 mt-3 mb-2">Address:</p>
                    <div className="border-b-2 border-gray-800 h-8"></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 mb-2">GSIS Beneficiary (Parent/Child's Name)</p>
                    <p className="text-xs font-bold text-gray-800 mb-2">Name of Beneficiary:</p>
                    <div className="border-b-2 border-gray-800 h-8 mb-3"></div>
                    <p className="text-xs font-bold text-gray-800 mb-2">Relationship:</p>
                    <div className="border-b-2 border-gray-800 h-8"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-right text-xs text-gray-700 border-2 border-gray-300">
              <p className="font-semibold">Application Code: <span className="text-red-700">{applicant.code.toUpperCase()}</span></p>
              <p className="font-semibold">Status: <span className="text-blue-700">{applicant.status.toUpperCase()}</span></p>
            </div>
          </div>
        </div>
      </div>

      {showImageModal && applicant.photoFileData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-6 right-6 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            <img
              src={applicant.photoFileData}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
