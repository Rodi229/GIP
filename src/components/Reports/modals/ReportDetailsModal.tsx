import React from 'react';

interface ReportDetailsModalProps {
  title: string;
  data: any[];
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ title, data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          {data.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No data available.</p>
          ) : (
            <table className="w-full text-sm border-t border-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="py-2">Name</th>
                  <th>School</th>
                  <th>Course</th>
                  <th>Barangay</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2">{p.fullName}</td>
                    <td>{p.school}</td>
                    <td>{p.course}</td>
                    <td>{p.barangay}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
