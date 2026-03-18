export default function LoadingState({ label }) {
  return (
    <div className="section-shell p-6 text-sm text-mist">
      <div className="progress-track mb-3 h-2 w-24 animate-pulse rounded-full" />
      <p>Loading {label}...</p>
    </div>
  );
}
