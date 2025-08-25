import { Ttypes } from "@/models/type";
import Image from "next/image";

interface Section01Props {
  breathingColor: string;
  breathingName: string;
  type: Ttypes;
}

export function Section01({
  breathingColor,
  breathingName,
  type,
}: Section01Props) {
  return (
    <>
      <h2 className="mt-32 font-shilla text-lightGray text-extraLarge">
        내가 계승한 호흡은..
      </h2>
      <h1
        style={{ color: breathingColor }}
        className="font-bold font-shilla text-extraTitle"
      >
        {breathingName}의 호흡
      </h1>
      <div className="w-full h-[353px] rounded-2xl relative overflow-hidden mt-12">
        <Image
          src={`/imgs/result/${type}.png`}
          alt={`${breathingName}의 결과 이미지`}
          fill
          className="object-cover relative"
          priority
        />
      </div>
      <h3 className="mt-20 font-nanum text-gray">
        아래로 드래그해 결과설명 확인하기
      </h3>
      <div className="w-full flex justify-center items-center mt-5">
        {/* @ts-ignore */}
        <dotlottie-wc
          src="https://lottie.host/c6893063-8f95-463a-a921-7a1c35200faf/fVgVWBTa1U.lottie"
          style={{ width: 50, height: 50 }}
          speed={1}
          autoplay
          loop
        />
      </div>
    </>
  );
}
