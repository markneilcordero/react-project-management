import { useState, useEffect } from 'react';

function OnboardingNote({ storageKey = 'onboardingNoteDismissed', children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    setVisible(!dismissed);
  }, [storageKey]);

  if (!visible) return null;

  return (
    <div className="card mb-4 shadow-sm border-info" style={{ background: '#e7f5ff' }}>
      <div className="card-body d-flex align-items-center">
        {children}
      </div>
    </div>
  );
}

export default OnboardingNote;
