import { useRouter } from 'next/router';
import vi from '../i18n/vi';
import en from '../i18n/en';

/**
 *
 * @param {{ langVi?: any; langEn?: any }} props
 * @returns
 */
const useTrans = (props = {}) => {
  const { langVi, langEn } = props;
  const { locale } = useRouter();
  if (!langVi && !langEn) {
    return locale === 'vi' ? vi : en;
  }
  if (!!langVi && !!langEn) {
    return locale === 'vi' ? langVi : langEn;
  }
  return langVi || langEn;
}

export default useTrans;
