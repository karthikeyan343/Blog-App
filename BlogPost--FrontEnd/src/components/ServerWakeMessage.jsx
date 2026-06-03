import { useEffect, useState } from 'react';

const ServerWakeMessage = ({ title = 'Loading...', compact = false }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const message = (
    <div className={`server-wake-message${compact ? ' server-wake-message-compact' : ''}`}>
      <div className="server-wake-status">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <div>
          <h4 className="mb-1">{title}</h4>
          <p className="text-muted mb-1">
            Starting the free backend server. This can take up to a minute after inactivity.
          </p>
          <small className="text-muted">Waiting {seconds}s</small>
        </div>
      </div>

      {!compact && (
        <div className="post-skeleton-list" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div className="post-skeleton" key={item}>
              <span className="post-skeleton-image"></span>
              <span className="post-skeleton-line post-skeleton-title"></span>
              <span className="post-skeleton-line"></span>
              <span className="post-skeleton-line post-skeleton-short"></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (compact) {
    return message;
  }

  return (
    <div className="container py-4">
      {message}
    </div>
  );
};

export default ServerWakeMessage;
