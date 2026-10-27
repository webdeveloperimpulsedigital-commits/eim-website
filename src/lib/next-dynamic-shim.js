import React, { Suspense, lazy } from 'react';

export default function dynamic(importFn, options = {}) {
  const LazyComponent = lazy(importFn);
  const Loading = options.loading || (() => null);

  return function DynamicComponent(props) {
    return React.createElement(
      Suspense,
      { fallback: React.createElement(Loading, null) },
      React.createElement(LazyComponent, props)
    );
  };
}
