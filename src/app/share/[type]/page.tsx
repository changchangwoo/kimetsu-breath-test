import { breathingColors } from '@/constants/breathingColors';
import { Ttypes } from '@/models/type';
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(breathingColors).map(type => ({
    type: type as Ttypes,
  }));
}

export default async function ShaprePage() {
  redirect('/');
  return null;
}
