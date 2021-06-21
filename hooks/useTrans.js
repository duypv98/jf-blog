import { useRouter } from 'next/router';
import vi from '../i18n/vi';
import en from '../i18n/en';

const useTrans = () => {
  const { locale } = useRouter();
  const trans = locale === 'vi' ? vi : en;
  return trans;
}

export default useTrans;
