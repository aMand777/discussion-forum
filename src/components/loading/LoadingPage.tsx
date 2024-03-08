type LoadingPageProps = {
  loading: string;
};

function LoadingPage({ loading = 'loading-dots' }: LoadingPageProps) {
  return (
    <div className="absolute top-0 z-50 w-full h-screen">
      <div className="flex items-center justify-center w-full h-screen bg-base-300">
        <span className={`loading ${loading} loading-lg text-accent`} />
      </div>
    </div>
  );
}

export default LoadingPage;
