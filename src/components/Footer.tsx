import { footerLinks } from "../constants"

const Footer = () => {
  return (
    <footer><div className="info">
      <p>More ways to shop: <a href="#">Find an Apple Store</a> or <a href="#">other retailer</a> near you. Or call 1-800-MY-APPLE.</p>
      <img src="/logo.svg" alt="Apple Logo" />
      </div>
      
      <hr />

      <div className="links">
      <p>Copyright © 2025 Apple Inc. All rights reserved.</p>

      {footerLinks.map (({label, link})=> (
        <ul key={label}><a href={link}>{label}</a></ul>
      ))}
      </div>
      </footer>
  )
}

export default Footer