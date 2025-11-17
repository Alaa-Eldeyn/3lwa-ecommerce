import Breadcrumb from "@/src/components/common/Breadcrumb";
import { useTranslations } from "next-intl";
import { 
  CheckCircle, 
  Users, 
  Package, 
  Globe, 
  Award,
  Target,
  Eye,
  Heart
} from "lucide-react";

const AboutUs = () => {
  const t = useTranslations('about');

  const values = [
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: t('values.quality.title'),
      description: t('values.quality.description'),
      color: "text-primary dark:text-primary"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: t('values.trust.title'),
      description: t('values.trust.description'),
      color: "text-secondary dark:text-secondary"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: t('values.innovation.title'),
      description: t('values.innovation.description'),
      color: "text-primary dark:text-primary"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: t('values.customer.title'),
      description: t('values.customer.description'),
      color: "text-secondary dark:text-secondary"
    }
  ];

  const stats = [
    { value: "10,000+", label: t('stats.customers'), icon: <Users className="w-8 h-8" /> },
    { value: "5,000+", label: t('stats.products'), icon: <Package className="w-8 h-8" /> },
    { value: "20+", label: t('stats.countries'), icon: <Globe className="w-8 h-8" /> },
    { value: "5+", label: t('stats.experience'), icon: <Award className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary dark:text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
                  <Target className="w-8 h-8 text-primary dark:text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('mission.title')}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t('mission.description')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-lg">
                  <Eye className="w-8 h-8 text-secondary dark:text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('vision.title')}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t('vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('values.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className={`${value.color} mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
