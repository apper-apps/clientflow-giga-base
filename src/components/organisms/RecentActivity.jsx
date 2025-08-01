import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RecentActivity = ({ dashboardData }) => {
  // Use real data from the dashboard service
  const activities = dashboardData?.recentActivity || [];

  const getActivityBadge = (type) => {
    const badges = {
      project: { variant: "primary", label: "Project" },
      task: { variant: "secondary", label: "Task" },
      invoice: { variant: "warning", label: "Invoice" },
      client: { variant: "success", label: "Client" },
      payment: { variant: "success", label: "Payment" }
    };
    return badges[type] || { variant: "default", label: "Activity" };
  };

  return (
    <Card className="h-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <Badge variant="primary">Live</Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <ApperIcon name="Activity" size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent activity to display
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Activity will appear here as you work with projects, tasks, and invoices
              </p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${activity.iconColor}`}>
                  <ApperIcon name={activity.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant={getActivityBadge(activity.type).variant}
                      className="text-xs"
                    >
                      {getActivityBadge(activity.type).label}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                    {activity.title}
                  </p>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.client}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <ApperIcon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" 
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {activities.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200">
              View all activity
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;