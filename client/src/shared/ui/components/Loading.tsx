import Skeleton from 'react-loading-skeleton'
 

const CircleLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
    </div>
  );
};


export const PageSkeletonLoader = ()=>{
  return <Skeleton/>
}

export default CircleLoading;