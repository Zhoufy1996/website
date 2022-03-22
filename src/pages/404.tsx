import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/equipmentenhance');
  }, [router]);
  return (
    <div>
      404, not found page ...
    </div>
  );
};

export default Page404;
