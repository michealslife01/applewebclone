
import { navLinks } from '../constants'


const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-50'>
        <nav className='flex items-center justify-between px-10 py-4'>
            <img src='/logo.svg' alt="logo" className='w-7 h-7' />
            <ul className='flex items-center gap-4'>
                {navLinks.map(({label, href}) => (
                    <li key={label}>
                        <a href={href}>{label}</a>
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2'>
                    <img src='/search.svg' alt="search" className='w-5 h-5' />
                    <img src='/cart.svg' alt="cart" className='w-5 h-5' />
                </button>
            </div>
        </nav>


    </header>
  )
}

export default Navbar