
import MonacoEditor from '../Editor/MonacoEditor'
import Tsparticles from '../tsparticles'
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
    <Tsparticles/>
     <div className='relative flex  items-center flex-col gap-4'>
        <Toaster toastOptions={{duration:4000}}/>
      <p className=' font-semibold text-2xl mt-8 text-slate-100 '>Create & Share</p>
      <p className='text-4xl text-slate-100 font-semibold'>Your Code Easily</p>
      <MonacoEditor/>
      </div>
    </>
  )
}
