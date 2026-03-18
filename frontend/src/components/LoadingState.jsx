export default function LoadingState({ label }) {
  return (
    <div className="section-shell p-6 text-sm text-mist">
      <div className="mb-3 h-2 w-24 animate-pulse rounded-full bg-white/10" />
      <p>Loading {label}...</p>
    </div>
  );
}
