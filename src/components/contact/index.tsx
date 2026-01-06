import Breadcrumb from "@/src/components/common/Breadcrumb";
import ContactForm from "@/src/components/contact/components/ContactForm";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const ContactUs = () => {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("info.address.title"),
      value: t("info.address.value"),
      color: "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("info.email.title"),
      value: t("info.email.value"),
      color: "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t("info.phone.title"),
      value: t("info.phone.value"),
      color: "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("info.hours.title"),
      value: t("info.hours.value"),
      color: "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Breadcrumb />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <div
                  className={`${info.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {info.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("form.title")}
              </h2>
              <ContactForm />
            </div>

            {/* Map or Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg h-full border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("info.title")}
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`${info.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="mt-8 bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-500 dark:text-gray-400">Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
