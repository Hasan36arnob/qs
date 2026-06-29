'use client';

import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-100">
      <AdminSidebar />
      <div className="md:pl-64">
        <main className="min-h-screen p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
