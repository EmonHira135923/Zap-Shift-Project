import React from "react";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../AllImg/Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <Logo />
              </div>
              <div>
                <span className="text-2xl font-bold">ZafShift</span>
                <p className="text-blue-100 text-sm mt-1">by ZapShift</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Providing reliable parcel delivery services across Bangladesh.
              Fast, secure, and efficient logistics solutions for your personal
              and business needs.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-100">
                <Phone size={18} />
                <span>+8801817516654</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Mail size={18} />
                <span>emonhossainhira231@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className="text-blue-100 hover:text-white transition-colors duration-200 "
              >
                Home
              </NavLink>
              <NavLink
                to="/service"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Services
              </NavLink>
              <NavLink
                to="/pricing"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Pricing
              </NavLink>
              <NavLink
                to="/coverage"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Coverage Area
              </NavLink>
              <NavLink
                to="/aboutus"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                About Us
              </NavLink>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <div className="flex flex-col gap-3">
              <NavLink
                to="/contact"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/blog"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Blog
              </NavLink>
              <NavLink
                to="/tracking"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Track Your Parcel
              </NavLink>
              <NavLink
                to="/faq"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                FAQ
              </NavLink>
              <NavLink
                to="/privacy"
                className="text-blue-100 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-blue-100">
                Copyright © {new Date().getFullYear()} Emon.IO - All rights
                reserved
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Powered by ZapShift Technologies
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-end">
              <p className="mb-3 text-lg font-bold">Follow Us</p>
              <div className="flex gap-4">
                <NavLink
                  to="https://x.com/hira_bd"
                  target="_blank"
                  className="bg-blue-800 p-3 rounded-lg hover:bg-[#0CA6B3] hover:scale-110 transition-all duration-200"
                >
                  <Twitter size={20} />
                </NavLink>
                <NavLink
                  to="https://www.facebook.com/Emon1359"
                  target="_blank"
                  className="bg-blue-800 p-3 rounded-lg hover:bg-[#0CA6B3] hover:scale-110 transition-all duration-200"
                >
                  <Facebook size={20} />
                </NavLink>
                <NavLink
                  to="https://www.linkedin.com/in/emon135923/"
                  target="_blank"
                  className="bg-blue-800 p-3 rounded-lg hover:bg-[#0CA6B3] hover:scale-110 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
