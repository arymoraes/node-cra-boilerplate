import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
function setGames(res: any) {
  throw new Error('Function not implemented.');
}

