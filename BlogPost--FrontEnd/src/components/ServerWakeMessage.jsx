const ServerWakeMessage = ({ title = 'Loading...', compact = false }) => {
  const message = (
    <div className="server-wake-message">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <div>
          <h4 className="mb-1">{title}</h4>
          <p className="text-muted mb-0">
            The free hosting server may be waking up. This can take a few seconds and is not a website issue.
          </p>
        </div>
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
