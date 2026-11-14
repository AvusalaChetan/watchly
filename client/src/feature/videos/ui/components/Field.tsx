const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

export default Field