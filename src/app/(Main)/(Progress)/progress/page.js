import '@/style/index.css'

export default async function RootLayot() {
  return (
    <iframe
      src="https://docs.google.com/document/d/1p8zIAz4Ko2vAC9MuVQ9Jg9-rXQiZRM6VR_r2hOHfk7U/edit?embedded=true"
      style={{ border: 'none', width: '100%', height: '100vh' }}
      title="Example Iframe"
    />
  )
}