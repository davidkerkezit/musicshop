import { useState } from "react";

const useImageUploader = () => {
  const [imageFormatCheck, setImageFormatCheck] = useState(true);
  const [imageSrc, setImageSrc] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let file;
    if (event.target.files !== null) {
      file = event.target.files[0];
    }

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (
          typeof reader.result === "string" &&
          reader.result.startsWith("data:image/png;base64,")
        ) {
          setImageFormatCheck(true);

          setImageSrc(reader.result);
        } else {
          setImageFormatCheck(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return { imageFormatCheck, handleImageUpload, imageSrc, setImageSrc };
};

export default useImageUploader;
