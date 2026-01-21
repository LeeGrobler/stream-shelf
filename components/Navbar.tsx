import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="navbar bg-transparent shadow-sm">
      <div className="flex-1">
        <Link href='/' className='btn btn-ghost text-xl'>
          <Image src='/icons/logo.png' alt='logo' width={24} height={24} />
          <p>StreamShelf</p>
        </Link>
      </div>

      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/videos'>Videos</Link></li>
          <li><Link href='/settings'>Settings</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar