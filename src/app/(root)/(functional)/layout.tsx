'use client';

import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/grid-layer.svg"
          fill
          objectFit="cover"
          quality={100}
          alt="bg"
        />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
