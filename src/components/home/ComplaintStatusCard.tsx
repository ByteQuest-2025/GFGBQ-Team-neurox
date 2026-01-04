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
      return <CheckCircle className="h-4 w-4" />;
    case "Processing":
      return <Clock className="h-4 w-4 animate-pulse" />;
    case "Pending":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Resolved":
      return "status-resolved";
    case "Processing":
      return "status-in-review";
    case "Pending":
      return "status-submitted";
    default:
      return "status-submitted";
  }
};

export const ComplaintStatusCard = () => {
  return (
    <GlassCard className="h-full bg-app-surface border border-app shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Complaint Status
        </h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-app bg-app-background dark:bg-app-surface/60">
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
                className="border-b border-app hover:bg-app-surface/50 transition-colors"
              >
                <td className="py-3 px-2 text-sm font-mono text-blue-600 dark:text-blue-400">
                  {complaint.id}
                </td>
                <td className="py-3 px-2 text-sm text-foreground dark:text-white">
                  {complaint.name}
                </td>
                <td className="py-3 px-2 text-sm text-muted-foreground">
                  {complaint.language}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(complaint.status)}
                    <span className={`status-badge ${getStatusClass(complaint.status)}`}>
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
