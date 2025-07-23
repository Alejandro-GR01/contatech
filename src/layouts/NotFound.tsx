

const NotFound = () => {
  return (
    <div className='bg-slate-800 text-gray-200 flex items-center justify-center h-screen'>
        <div>
        
            <p className="text-xl md:text-2xl font-light p-2">Error!</p>
           
            <div className="flex gap-9 items-center justify-between">
                <p className='text-3xl md:text-5xl font-bold '>404</p>
                <p className='textx-2xl md:text-4xl font-bold'>|</p>
                <h2 className='text-2xl md:text-3xl font-semibold'>  Not Found</h2>
            </div>
        </div>
    </div>
  )
}

export default NotFound