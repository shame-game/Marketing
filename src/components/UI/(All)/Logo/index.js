import Image from 'next/image';

export default function Logo() {
  return (<>
    <div style={{
      width: '74px',
      height: '74px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image src='https://lh3.googleusercontent.com/d/1QdHytZ_t35VBgdH1uD49UFCcFf0mQjRJ'
        width={30} height={30}
        style={{ objectFit: 'cover', height: 'auto', width: 'auto' }} alt='logo' priority />
    </div>
  </>)
}