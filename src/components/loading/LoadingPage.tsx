import React from 'react'

type LoadingPageProps = {
  loading?: string
}

const LoadingPage: React.FC<LoadingPageProps> = ({ loading = 'loading-dots' }) => {
  return (
    <div className='absolute top-0 z-50 w-full h-screen'>
      <div className='flex items-center justify-center w-full h-screen bg-base-300'>
        <span className={`loading ${loading} loading-lg text-secondary`}></span>
      </div>
    </div>
  )
}

export default LoadingPage