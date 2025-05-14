import { DashboardStats } from '@/components/admin/DashboardStats';
import { DashboardHeader } from '@/components/admin/DashboardHeader';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />
    </div>
  );
} 