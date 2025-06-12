"use client";
// components/Navigation.tsx
import React, { useState } from "react";
import Link from "next/link";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Principal", href: "/" },
    { name: "O que é Consulta Pública", href: "/o-que-e-ppa" },
    { name: "Como Participar", href: "/como-participar" },
    { name: "Participe", href: "/consulta-a-sociedade" },
    { name: "Devolutiva", href: "/devolutiva" },
    { name: "Estudos Prosai Parintins", href: "/estudos-prosai-parintins" },
    { name: "Dúvidas", href: "/duvidas" },
  ];

  return (
    <nav className="mt-4">
      <button
        className="md:hidden text-blue-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <ul
        className={`md:flex md:space-x-6 ${
          isOpen ? "block" : "hidden"
        } mt-2 md:mt-0`}
      >
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-blue-800"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
