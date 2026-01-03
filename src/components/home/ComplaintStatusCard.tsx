import { motion } from "framer-motion";
import { Activity, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const complaints = [
  { id: "NX-7241", name: "Sarah Chen", language: "English", status: "Resolved" },
  { id: "NX-7242", name: "Ahmed Hassan", language: "Arabic", status: "Processing" },
  { id: "NX-7243", name: "Maria Garcia", language: "Spanish", status: "Pending" },
  { id: "NX-7244", name: "Klaus Weber", language: "German", status: "Resolved" },
  { id: "NX-7245", name: "Priya Sharma", language: "Hindi", status: "Processing" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Resolved":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "Processing":
      return <Clock className="h-4 w-4 text-warning animate-pulse" />;
    case "Pending":
      return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "text-success";
    case "Processing":
      return "text-warning";
    case "Pending":
      return "text-muted-foreground";
    default:
      return "";
  }
};

export const ComplaintStatusCard = () => {
  return (
    <GlassCard className="h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-teal-400 dark:bg-clip-text dark:text-transparent">
          Complaint Status
        </h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50">
              <th className="text-left text-xs font-medium text-gray-600 dark:text-gray-400 py-3 px-2">
                ID
              </th>
              <th className="text-left text-xs font-medium text-gray-600 dark:text-gray-400 py-3 px-2">
                Name
              </th>
              <th className="text-left text-xs font-medium text-gray-600 dark:text-gray-400 py-3 px-2">
                Language
              </th>
              <th className="text-left text-xs font-medium text-gray-600 dark:text-gray-400 py-3 px-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <motion.tr
                key={complaint.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="py-3 px-2 text-sm font-mono text-blue-600 dark:text-blue-400">
                  {complaint.id}
                </td>
                <td className="py-3 px-2 text-sm text-gray-900 dark:text-white">
                  {complaint.name}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">
                  {complaint.language}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(complaint.status)}
                    <span className={`text-sm ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
