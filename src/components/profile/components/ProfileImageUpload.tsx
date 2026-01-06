import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";

interface ProfileImageUploadProps {
  currentImage?: string;
  userName: string;
  onImageChange: (file: File) => void;
  t: (key: string) => string;
}

const ProfileImageUpload = ({
  currentImage,
  userName,
  onImageChange,
  t,
}: ProfileImageUploadProps) => {
  // بناء URL الصورة الكامل
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `${process.env.NEXT_PUBLIC_DOMAIN}/${imagePath}`;
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayImage = previewImage || getImageUrl(currentImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Call parent callback
      onImageChange(file);
      setShowModal(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowModal(false);
  };

  const getInitials = () => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
          {displayImage ? (
            <Image
              src={displayImage}
              alt=""
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitials()}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 soft border-4 border-white dark:border-gray-800">
          <Camera size={20} />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("personalInfo.changePhoto") || "Change Photo"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-3 px-6 py-4 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 soft border-2 border-dashed border-primary/30">
                <Upload size={24} />
                <div className="text-left">
                  <p className="font-semibold">{t("personalInfo.uploadPhoto") || "Upload Photo"}</p>
                  <p className="text-xs opacity-70">
                    {t("personalInfo.maxSize") || "Max size: 5MB"}
                  </p>
                </div>
              </button>

              {/* Remove Button */}
              {displayImage && (
                <button
                  onClick={handleRemoveImage}
                  className="w-full flex items-center gap-3 px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 soft">
                  <X size={24} />
                  <p className="font-semibold">{t("personalInfo.removePhoto") || "Remove Photo"}</p>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileImageUpload;
