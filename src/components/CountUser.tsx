'use client';

import fetchData from '@/apis/fetch';
import { useEffect, useState } from 'react';

export default function CountUser() {
  const [countUser, setCountUser] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCountUser() {
      try {
        const data = await fetchData(`/`, 'GET');
        setCountUser(data);
      } catch (err) {
        console.error('참여 인원 로딩 실패:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCountUser();
  }, []);

  return (
    <h2 className="mb-5 font-shilla text-medium text-lightGray">
      {countUser
        ? `현재 호흡을 계승한 인원 ${countUser}명`
        : `현재 호흡을 계승항 인원 --명`}
    </h2>
  );
}
