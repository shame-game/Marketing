"use client"

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Logo from '../Logo';

export default function SideBar({ data }) {
  let path = data.Role.Router

  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => setExpanded(false);
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: expanded ? '210px' : '74px',
      backgroundColor: 'var(--background)',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      zIndex: 10,
      boxShadow: expanded ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none',
    }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Logo />
      <div style={{ display: 'flex', flexDirection: 'column', margin: '2px 0' }}>
        {Object.entries(path).map(([key, value]) => (
          <Link href={key} passHref key={key}>
            <Nav text={value} expanded={expanded} action={[pathname, key]} />
          </Link>
        ))}
      </div>
    </div >
  );
}
