'use client';

import fetchData from '@/apis/fetch';

export default async function CountUser() {
  const countUser = await fetchData(`/`, 'GET');

  return (
    <h2 className="mb-5 font-shilla text-medium text-lightGray">
      현재 호흡을 계승한 인원 {countUser}명
    </h2>
  );
}
