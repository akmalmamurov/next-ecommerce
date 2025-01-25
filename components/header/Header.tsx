"use client";
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { Container } from "../container";
import Image from "next/image";
import logo from "@/images/logo.png";
import HeaderMenu from "./HeaderMenu";

export const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-1">
      <Container className="flex gap-2 flex-col md:flex-row justify-between md:items-center py-2">
        <div className="flex justify-between items-center gap-2">
        <Link href={"/"} className="">
          <Image src={logo} alt="logo" className="w-20 md:w-24" priority />
        </Link>
        <div className="block md:hidden">
          <HeaderMenu />
        </div>
        </div>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-50 text-gray-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
          />
        </Form>
        <div className="hidden md:block">
          <HeaderMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
