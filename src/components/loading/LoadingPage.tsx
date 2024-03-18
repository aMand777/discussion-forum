type LoadingPageProps = {
  type:
  | 'loading-spinner'
  | 'loading-dots'
  | 'loading-ring'
  | 'loading-ball'
  | 'loading-infinity';
  size:
  | 'loading-xs'
  | 'loading-sm'
  | 'loading-md'
  | 'loading-lg'
};

function LoadingPage({ type, size }: LoadingPageProps) {
  return (
    <div className="absolute top-0 z-50 w-full h-screen left-0">
      <div className="flex items-center justify-center w-full h-screen bg-base-300">
        <span data-testid="loadingPage" className={`loading ${type} ${size} text-accent`} />
      </div>
    </div>
  );
}

export default LoadingPage;
