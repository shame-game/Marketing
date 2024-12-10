import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Header from '@/components/UI/(All)/AIR_Header';
import SideBar from '@/components/UI/(All)/AIR_SideBar';
import Login from '@/components/UI/(Auth)/Login';
import '@/style/index.css';
import Box from '@mui/material/Box';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  // const token = cookies().get('u')?.value;

  // const response = await fetch(`http://localhost:3000/api/CheckUser`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({ source: 1 }),
  //   cache: 'no-store'
  // });

  // let data = null;

  // if (response.ok) {
  //   const result = await response.json();
  //   if (result.air === 2) {
  //     data = result.data;
  //   }
  // }

  return (
    <html lang="en">
      <body style={{ margin: 0, height: '100vh', background: 'var(--background)' }}>
        <AppRouterCacheProvider>
          {data ? (
            <div style={{ height: '100%', width: '100%' }}>
              <SideBar data={data} />
              <div style={{ marginLeft: '72px', height: '100%' }}>
                <Header data={data} />
                <Box
                  sx={{
                    height: 'calc(100% - 88px)',
                    width: 'calc(100% - 64px)',
                    padding: '8px 32px 8px 32px',
                    overflow: 'hidden',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { width: '0' },
                  }}
                >
                  {children}
                </Box>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
