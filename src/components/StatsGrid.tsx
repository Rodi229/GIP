import React, { useState } from 'react';
import {
  Users,
  Clock,
  UserCheck,
  CheckCircle,
  X,
  UserMinus,
  MapPin
} from 'lucide-react';
import { useData } from '../hooks/useData';
import { motion, AnimatePresence } from 'framer-motion';

interface StatsGridProps {
  activeProgram: 'GIP' | 'TUPAD';
}

const StatsGrid: React.FC<StatsGridProps> = ({ activeProgram }) => {
  const { statistics, isLoading } = useData(activeProgram);
  const [showMore, setShowMore] = useState(false);

  const primaryColor = activeProgram === 'GIP' ? 'bg-red-500' : 'bg-green-500';
  const primaryDarkColor = activeProgram === 'GIP' ? 'bg-red-600' : 'bg-green-600';
  const secondaryColor = activeProgram === 'GIP' ? 'bg-orange-500' : 'bg-blue-500';
  const secondaryDarkColor = activeProgram === 'GIP' ? 'bg-orange-600' : 'bg-blue-600';

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-lg p-6 h-32"
          ></div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'TOTAL APPLICANTS',
      value: statistics?.totalApplicants?.toString() ?? '0',
      male: statistics?.maleCount?.toString() ?? '0',
      female: statistics?.femaleCount?.toString() ?? '0',
      icon: Users,
      bgColor: primaryColor,
      iconBg: primaryDarkColor
    },
    {
      title: 'PENDING',
      value: statistics?.pending?.toString() ?? '0',
      male: statistics?.pendingMale?.toString() ?? '0',
      female: statistics?.pendingFemale?.toString() ?? '0',
      icon: Clock,
      bgColor: secondaryColor,
      iconBg: secondaryDarkColor
    },
    {
      title: 'APPROVED',
      value: statistics?.approved?.toString() ?? '0',
      male: statistics?.approvedMale?.toString() ?? '0',
      female: statistics?.approvedFemale?.toString() ?? '0',
      icon: UserCheck,
      bgColor: 'bg-blue-500',
      iconBg: 'bg-blue-600'
    },
    {
      title: 'DEPLOYED',
      value: statistics?.deployed?.toString() ?? '0',
      male: statistics?.deployedMale?.toString() ?? '0',
      female: statistics?.deployedFemale?.toString() ?? '0',
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      iconBg: 'bg-green-600'
    },
    {
      title: 'COMPLETED',
      value: statistics?.completed?.toString() ?? '0',
      male: statistics?.completedMale?.toString() ?? '0',
      female: statistics?.completedFemale?.toString() ?? '0',
      icon: CheckCircle,
      bgColor: 'bg-pink-400',
      iconBg: 'bg-pink-500'
    },
    {
      title: 'REJECTED',
      value: statistics?.rejected?.toString() ?? '0',
      male: statistics?.rejectedMale?.toString() ?? '0',
      female: statistics?.rejectedFemale?.toString() ?? '0',
      icon: X,
      bgColor: 'bg-yellow-500',
      iconBg: 'bg-yellow-600'
    },
    {
      title: 'RESIGNED',
      value: statistics?.resigned?.toString() ?? '0',
      male: statistics?.resignedMale?.toString() ?? '0',
      female: statistics?.resignedFemale?.toString() ?? '0',
      icon: UserMinus,
      bgColor: 'bg-gray-500',
      iconBg: 'bg-gray-600'
    },
    {
      title: 'BARANGAYS COVERED',
      value: statistics?.barangaysCovered?.toString() ?? '0',
      male: '0',
      female: '0',
      icon: MapPin,
      bgColor: 'bg-gray-600',
      iconBg: 'bg-gray-700'
    },
    {
      title: 'INTERVIEWED',
      value: statistics?.interviewed?.toString() ?? '0',
      male: statistics?.interviewedMale?.toString() ?? '0',
      female: statistics?.interviewedFemale?.toString() ?? '0',
      icon: UserCheck,
      bgColor: 'bg-purple-600',
      iconBg: 'bg-purple-700'
    }
  ];

  const visibleStats = showMore ? stats : stats.slice(0, 8);

  return (
    <div className="space-y-6">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300"
      >
        <AnimatePresence>
          {visibleStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25 }}
                className={`${stat.bgColor} text-white rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium opacity-90 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.iconBg} p-3 rounded-full`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs opacity-75">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{stat.male}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{stat.female}</span>
                  </div>
                </div>

                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Icon className="w-20 h-20" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modern See More / See Less button */}
      {stats.length > 8 && (
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMore(!showMore)}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white rounded-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-lg group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 translate-x-full group-hover:translate-x-0"></span>
            <span className="relative z-10">
              {showMore ? 'See Less ▲' : 'See More ▼'}
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default StatsGrid;
