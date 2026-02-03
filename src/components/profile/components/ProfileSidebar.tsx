import { LucideIcon } from "lucide-react";
import ProfileImageUpload from "./ProfileImageUpload";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ProfileSidebarProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  profileImagePath?: string;
  activeTab: string;
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  onImageChange?: (file: File) => void;
  onImageRemove?: () => void;
  t?: (key: string) => string;
}

const ProfileSidebar = ({
  userData,
  profileImagePath,
  activeTab,
  tabs,
  onTabChange,
  onImageChange,
  onImageRemove,
  t,
}: ProfileSidebarProps) => {
  const handleImageChange = (file: File) => {
    if (onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="mb-3">
          <ProfileImageUpload
            currentImage={profileImagePath}
            userName={`${userData.firstName} ${userData.lastName}`}
            onImageChange={handleImageChange}
            onImageRemove={onImageRemove}
            t={t || ((key) => key)}
          />
        </div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {userData.firstName} {userData.lastName}
        </h3>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl soft ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
