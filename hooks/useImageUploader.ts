import { useState } from "react";

const useImageUploader = () => {
  const [imageFormatCheck, setImageFormatCheck] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let file;
    if (event.target.files !== null) {
      file = event.target.files[0];
    }

    if (file) {
      // Check file size
      if (file.size > 1500 * 1024) {
        // Size exceeds 1500KB
        setErrorMessage(
          "Image size exceeds the maximum allowed limit of 1500KB"
        );
        setImageFormatCheck(false);

        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        if (
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image/png;base64,")
        ) {
          setImageFormatCheck(true);
          setImageSrc(reader.result);
        } else {
          setErrorMessage("Uploaded image is not in PNG format");
          setImageFormatCheck(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return {
    imageFormatCheck,
    handleImageUpload,
    imageSrc,
    setImageSrc,
    errorMessage,
  };
};

export default useImageUploader;
