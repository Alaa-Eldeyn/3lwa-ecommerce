"use client"
import { Link } from "@/src/i18n/routing";
import NewsLetter from "./NewsLetter";
import { socialLinks } from "@/src/data/data";
import Logo from "../Logo";
import { useTranslations } from "next-intl";



const Footer = () => {
  const t = useTranslations('footer');

  const footerLinks = {
    company: [
      { name: t('company.about'), href: "/about" },
      { name: t('company.features'), href: "/features" },
      { name: t('company.works'), href: "/works" },
      { name: t('company.career'), href: "/career" },
    ],
    help: [
      { name: t('help.support'), href: "/support" },
      { name: t('help.delivery'), href: "/delivery" },
      { name: t('help.terms'), href: "/terms" },
      { name: t('help.privacy'), href: "/privacy" },
    ],
    faq: [
      { name: t('faq.account'), href: "/faq/account" },
      { name: t('faq.deliveries'), href: "/faq/deliveries" },
      { name: t('faq.orders'), href: "/faq/orders" },
      { name: t('faq.payments'), href: "/faq/payments" },
    ],
    resources: [
      { name: t('resources.ebooks'), href: "/resources/ebooks" },
      { name: t('resources.tutorial'), href: "/resources/tutorial" },
      { name: t('resources.blog'), href: "/blog" },
      { name: t('resources.youtube'), href: "/resources/youtube" },
    ],
  };

  return (
    <footer className="bg-white dark:bg-gray-900">
      {/* Newsletter Section */}
      <NewsLetter/>

      {/* Main Footer Content */}

      <div className="bg-gray-100 dark:bg-gray-800 ">
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo type="dark"/>
            <p className="text-gray-600 dark:text-gray-400 text-sm my-6">
              {t('description')}
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
              {t('company.title')}
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
              {t('help.title')}
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
              {t('faq.title')}
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
              {t('resources.title')}
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
              Alwa.dev © 2000-{new Date().getFullYear()}, {t('rights')}
            </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;