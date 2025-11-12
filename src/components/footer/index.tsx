"use client"
import { Link } from "@/src/i18n/routing";
import NewsLetter from "./NewsLetter";
import { footerLinks, socialLinks } from "@/src/data/data";



const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      {/* Newsletter Section */}
      <NewsLetter/>

      {/* Main Footer Content */}

      <div className="bg-gray-100 dark:bg-gray-800 pt-0 lg:pt-20">
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 block">
              Alwa.dev
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition ${social.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              FAQ
            </h3>
            <ul className="space-y-3">
              {footerLinks.faq.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              Alwa.dev © 2000-{new Date().getFullYear()}, All Rights Reserved
            </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;