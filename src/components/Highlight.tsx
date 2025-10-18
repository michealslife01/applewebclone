import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const Highlight = () => {
    const isMobile = useMediaQuery({query:'(max-width: 1024px)'});

useGSAP(()=> {
    gsap.to(['.left-column', '.right-column'], {
        scrollTrigger: {
            trigger: '#highlights',
            start: isMobile ? 'bottom bottom' : 'top top',
        },
        y: 0,
        opacity: 1,
        ease: 'power1.inOut',
        stagger: 0.1,
        duration: 1,
    })
})
  return (
    <section id="highlights">
        <h2>Theres never been a better time to Upgrade</h2>
        <h3>here's what you get in the new MacBook Pro </h3>

        <div className="masonry">
            <div className="left-column">
                <div>
                    <img src="/laptop.png" alt="laptop" />
                    <p>fly through demanding task up to 9 times faster</p>
                </div>
                <div>
                    <img src="/sun.png" alt="sun" />
                    <p>a stunning <br/> liquid retina XDR display</p>
                </div>
            </div>
            <div className="right-column">
                <div className="apple-gradient">
                    <img src="/ai.png" alt="ai" />
                    <p><span>Built for apple intelligence</span></p>
                </div>
                <div>
                    <img src="/battery.png" alt="battery" />
                    <p><span className="green-gradient">{' '}Up to 14 hours more {' '}</span> battery life. <span className="text-dark-100">{' '}span(up to 24 hours total).</span></p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Highlight