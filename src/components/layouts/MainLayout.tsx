import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
}
