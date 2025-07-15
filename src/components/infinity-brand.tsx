import Image from "next/image";

export const InfiniteBrand = () => {
  return (
    <>

    <h1 className="text-xl font-semibold text-center mt-12">Loved by product folks at</h1>
      <style>
        {`
          @keyframes infinite-scroll-right {
            from { transform: translateX(0%); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>

      <div className='w-full text-5xl py-8 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
        <div className='flex animate-infinite-scroll' style={{ animation: 'infinite-scroll-right 60s linear infinite' }}>
          <ul className='flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none flex-shrink-0'>
          {/* Strapi */}
          <li className="border py-8 px-8 rounded-x">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f453cadd0c46889122220c_Strapi.full.logo.dark.svg"
                height={32}
                width={120}
                alt="Strapi"
                className="h-8 w-auto filter grayscale"
              />
            </div>
          </li>

          {/* Choose */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65e7975fc6a080541d2222ee_choose-logo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* MokaCare */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f455c6ba094aade8acbdd0_mokacare.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Fabriq */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f451c5d51d114d00417a16_fabriq-logo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Beacons */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image 
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4526b13eef9d7404ab1bb_658315a8cc8cc05b4a90af40_BeaconsLogoBlack.svg"
                height={32}
                width={120}
                alt="Beacons"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Meo */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f455b02304c72ea0b564a7_meo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* PassionFroot */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f44f9e6356e70fa620b49d_passionfroot.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Trust Layer */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4564a3234c2812bb11618_trustlayer.png"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>
         
         {/* Trova Trip */}
         <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4522d3add29cae90e4b5a_logotrovatrip.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>
          </ul>

          {/* Duplicate content for seamless scrolling */}
          <ul className='flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none flex-shrink-0'>
          {/* Strapi */}
          <li className="border py-8 px-8 rounded-x">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f453cadd0c46889122220c_Strapi.full.logo.dark.svg"
                height={32}
                width={120}
                alt="Strapi"
                className="h-8 w-auto filter grayscale"
              />
            </div>
          </li>

          {/* Choose */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65e7975fc6a080541d2222ee_choose-logo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* MokaCare */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f455c6ba094aade8acbdd0_mokacare.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Fabriq */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f451c5d51d114d00417a16_fabriq-logo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Beacons */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4526b13eef9d7404ab1bb_658315a8cc8cc05b4a90af40_BeaconsLogoBlack.svg"
                height={32}
                width={120}
                alt="Beacons"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Meo */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
               <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f455b02304c72ea0b564a7_meo.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* PassionFroot */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f44f9e6356e70fa620b49d_passionfroot.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

          {/* Trust Layer */}
          <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4564a3234c2812bb11618_trustlayer.png"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>

         {/* Trova Trip */}
         <li className="border py-8 px-8 rounded-xl">
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src="https://cdn.prod.website-files.com/62b5b85dd560583e288cb389/65f4522d3add29cae90e4b5a_logotrovatrip.svg"
                height={32}
                width={120}
                alt="MokaCare"
                className="h-8 w-auto filter grayscale brightness-0"
              />
            </div>
          </li>
          </ul>
        </div>
      </div>
    </>
  );
};