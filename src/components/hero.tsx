import { useEffect, useRef } from 'react'

const hero = () => {

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2;
        }
    }, [])
  return (
    <section id='hero'>
        <div>
            <h1>Mackbook Pro</h1>
            <img src="/title.png" alt="title" />
        </div>

        <video src="/videos/hero.mp4" autoPlay muted playsInline ref={videoRef} />

        <button>Buy</button>
        <p>From $1599 or $133/mo. for 12mo.</p>
    </section>
  )
}

export default hero