import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: Add authentication check here
  // const session = await getServerSession();
  // if (!session?.user?.isAdmin) {
  //   redirect('/login');
  // }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
} 