

export type MesageProps = {
    text: string,
    type: 'error' | 'success' 
}

const Mesage = ({ text, type = 'error' }: MesageProps) => {
    
    if (text === '') {
        return <></>
    } else {

        return (
            <p className={`py-2 px-4 md:py-3 md:px-6 mt-8  w-full h-auto text-lg md:text-xl font-semibold text-center border ${type === 'success' ? 'text-green-600 bg-green-200 border-green-600' : ' text-red-600 bg-red-200 border-red-600' }`}>{text}</p>
            

        )


    }
   
}

export default Mesage