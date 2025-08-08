import { LazyExoticComponent, ComponentType, Suspense, ReactNode } from 'react';

export function lazyWithSuspense<P extends object>(
  LazyComponent: LazyExoticComponent<ComponentType<P>>,
  props: P,
  fallback: ReactNode = <div>Loading...</div>
): ReactNode {
  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
