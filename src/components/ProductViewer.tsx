import { useRef } from 'react'
import useMacStore from '../store'
import clsx from 'clsx'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
// @ts-ignore
import MacbookModel14 from './models/Macbook-14'
// @ts-ignore
import MacbookModel16 from './models/Macbook-16'
import StudioLight from './studioLight'

const ProductViewer = () => {
    //@ts-ignore
    const {color, size, scale, setColor, setSize, setScale, reset} = useMacStore();

  return (
    <section id='product-viewer'>
        <h2>Take a closer look</h2>

        <div className='controls'>
            <p className='text-2xl font-bold'>MacBookPro {scale === 0.06 ? '14"' : '16"'} in {color === '#adb5bd' ? 'Silver' : 'Space Black'}</p>

            <div className='flex items-center gap-2'>
                <div className='color-control'>
                    <div className={clsx ('bg-neutral-300', color==='#adb5bd' && 'active')} onClick={()=> setColor('#adb5bd')} />
                    <div className={clsx ('bg-neutral-900', color==='#2e2c2e' && 'active')} onClick={()=> setColor('#2e2c2e')} />
                </div>
                <div className='size-control' >
                    <div className={clsx ( scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white', scale === 0.06 && 'active')}  onClick={()=> setScale(0.06)}><p>14</p></div>
                    <div className={clsx ( scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white', scale === 0.08 && 'active')}  onClick={()=> setScale(0.08)}><p>16</p></div>
                </div>
            </div>
        </div>

        <p className=' text-white text-4xl'>Render Canvas</p>
       <Canvas id='canvas' camera={{ position:[0 , 2, 5], fov: 50, near: 0.1, far: 100}} >
        <StudioLight />
        <MacbookModel14 position={[0,0, 0]} scale = {0.06}/>
       
        <OrbitControls enableZoom={false} />
       </Canvas>
    </section>
  )
}

export default ProductViewer