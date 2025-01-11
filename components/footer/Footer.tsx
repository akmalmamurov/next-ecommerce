import Image from "next/image";
import { Container } from "../container";
import { paymentImg } from "@/images";

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container className="py-5 flex justify-between items-center">
        <p className="text-gray-500">
        Created by <span className="text-darkBlue font-semibold">Akmal Mamuroff</span> © 2025. All rights reserved.
        </p>
        <Image src={paymentImg} alt="payment" className="w-64 object-cover"/>
      </Container>
    </footer>
  );
};

export default Footer;
