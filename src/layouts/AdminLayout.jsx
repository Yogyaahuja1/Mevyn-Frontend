/**
 * Admin layout — wraps all admin panel pages.
 *
 * Structure:
 *   Desktop: fixed sidebar (256px) + header + scrollable main content
 *   Mobile: hidden sidebar (drawer) + header with toggle button + main content
 *
 * Used by: DashboardPage, PostManagementPage, PostEditorPage,
 *          EventManagementPage, EventEditorPage, AccountManagementPage
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-dark-bg">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
