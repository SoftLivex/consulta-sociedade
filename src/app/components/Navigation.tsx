"use client";
// components/Navigation.tsx
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ham, Hamburger, Menu } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "O que é Consulta Pública", href: "/o-que-e-ppa" },
    { name: "Como Participar", href: "/como-participar" },
    { name: "Participe", href: "/consulta-a-sociedade" },
    { name: "Devolutiva", href: "/devolutiva" },
    { name: "Estudos Prosai Parintins", href: "/estudos-prosai-parintins" },
    { name: "Dúvidas", href: "/duvidas" },
  ];

  return (
    <Fragment>
      <Button
        className="lg:hidden text-blue-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Button>
      <ul
        className={`lg:flex lg:space-x-6 ${
          isOpen ? "block" : "hidden"
        } mt-2 lg:mt-0`}
      >
        {menuItems.map((item) => (
          <li key={item.name}>
            <Button variant="link" size="sm">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Navigation;
