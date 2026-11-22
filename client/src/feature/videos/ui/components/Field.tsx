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
    <label className="text-sm font-medium text-(--foreground)">{label}</label>
    {children}
    {error && <p className="text-xs text-(--primary)">{error}</p>}
  </div>
);

export default Field