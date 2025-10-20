import { Canvas } from "@react-three/fiber"
// @ts-ignore
import MacbookModel from "./models/Macbook";

import StudioLight from "./three/studioLight";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import useMacStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
    const groupRef = useRef<THREE.Group>(null);
    const isMobile = useMediaQuery({query: '( max-width: 1024px )'});
    const setTexture = useMacStore((state: any) => state.setTexture);

    useEffect(() => {
        const videos: HTMLVideoElement[] = [];

        featureSequence.forEach((feature) => {
            const video = document.createElement('video');
            Object.assign(video, {
                src: `/videos/${feature.videoPath}`,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous',
            });
            videos.push(video);
        })

        return () => {
            videos.forEach(video => {
                video.pause();
                video.src = '';
                video.load();
            });
        }
    }, []);


    useGSAP(() => {
        //3d rotation animation
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            }
        })

        //sync feature context
        const timeline = gsap.timeline({

            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom top',
                scrub: 1,
            }
        })

        // 3D SPIN
        if(groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut'})
        }

        // Content & Texture Sync
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, delay: 1 })

            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0})

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0 })
    }, []);

    return (
        <group ref={groupRef}>
        <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase"></h1></Html>}>
            <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
        </Suspense>
    </group>
    )
}

const Features = () => {
  return (
    <section id='features'>
      
          <h2>See it all in a new light.</h2>

          <Canvas id="f-canvas" camera={{ }}>
            <StudioLight />
            <ambientLight intensity={0.5}  />
            <ModelScroll />
          </Canvas>

          <div className="absolute inset-0">
            {features.map(({id, icon, highlight, text, styles}, index) => (
                <div key={id} className={clsx('box', `box${index + 1}`, styles)}>
                    <img src={icon} alt={highlight} className="w-10 h-10" />
                    <p>
                        <span className="text-white text-2xl uppercase">{highlight}</span>
                        {text}
                    </p>
                </div>
            ))}
          </div>    
    </section>
  )
}

export default Features