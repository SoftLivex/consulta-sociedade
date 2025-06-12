// components/LogoGroup.tsx
import React from "react";
import Image from "next/image";

const LogoGroup = () => {
  return (
    <div className="flex space-x-4">
      <Image
        src="http://www.consultasociedadeprosaiparintins.am.gov.br/wp-content/themes/moesia/images/logo-prosai.svg"
        alt="Logo Prosai"
        width={100}
        height={50}
      />
      <Image
        src="http://www.consultasociedadeprosaiparintins.am.gov.br/wp-content/themes/moesia/images/logo-parintins.svg"
        alt="Logo Parintins"
        width={100}
        height={50}
      />

      <Image
        src="https://apstatic.prodam.am.gov.br/images/logo_governo/logo-gov-horizontal.png"
        alt="Logo Governo do Amazonas"
        width={150}
        height={50}
      />
    </div>
  );
};

export default LogoGroup;
