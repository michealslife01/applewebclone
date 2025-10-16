import useMacStore from '../store';
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import StudioLight from './three/studioLight';
import ModelSwitcher from './three/ModelSwitcher';
import { useMediaQuery } from 'react-responsive';

const ProductViewer = () => {
    //@ts-ignore
    const {color, size, scale, setColor, setSize, setScale, reset} = useMacStore();

    const isMobile = useMediaQuery({query: '(max-width:1024px)'})

  return (
    <section id='product-viewer'>
        <h2>Take a closer look</h2>

        <div className='controls'>
            <div className='flex items-center gap-2'>
                <div className='color-control'>
                    <div className={clsx ('bg-neutral-300', color==='#c0c0c0' && 'active')} onClick={()=> setColor('#c0c0c0')} />
                    <div className={clsx ('bg-neutral-900', color==='#2e2c2e' && 'active')} onClick={()=> setColor('#2e2c2e')} />
                </div>
                <div className='size-control' >
                    <div className={clsx ( scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white', scale === 0.06 && 'active')}  onClick={()=> setScale(0.06)}><p>14</p></div>
                    <div className={clsx ( scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white', scale === 0.08 && 'active')}  onClick={()=> setScale(0.08)}><p>16</p></div>
                </div>
            </div>
        </div>
       <Canvas id='canvas' camera={{ position:[0 , 2, 5], fov: 50, near: 0.1, far: 100}} >
        <StudioLight />
        <ModelSwitcher scale={scale} isMobile={isMobile} />
       </Canvas>
    </section>
  )
}

export default ProductViewer