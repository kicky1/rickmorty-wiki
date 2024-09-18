import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonCard = () => {
  return (
    <Card className='border-2 border-green-500 bg-slate-900 drop-shadow-[1px_1px_5px_rgba(3,138,255,1)]'>
      <CardContent className="p-4">
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-1 flex flex-col justify-center text-white'>
            <Skeleton className='h-6 w-1/1 mb-2' />
            <Skeleton className='h-4 w-3/4 mb-2' />
            <Skeleton className='h-4 w-3/4 mb-2' />
            <Skeleton className='h-4 w-3/4 mb-2' />
            <Skeleton className='h-4 w-3/4' />
          </div>
          <div className='col-span-1 justify-self-end'>
            <Skeleton className='w-[120px] h-full bg-green-500' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SkeletonCard
