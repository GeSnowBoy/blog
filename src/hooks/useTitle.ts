import * as React from 'react';
export function useTitle(title) {
  React.useEffect(() => {
    document.title = title;
    console.log('行号6:', title);
  }, [title]);
}
