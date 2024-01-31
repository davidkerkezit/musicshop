"use client";
import { aboutUsContent } from "@/libs/content";
import { AboutUsSection, PageBanner } from "@/components";
const page = () => {
  return (
    <div>
      <PageBanner page="About Us" />
      <div className="relative z-10 m-32 flex flex-col gap-10">
        {aboutUsContent.map((content, index) => {
          let isEven = index % 2 === 0;
          return <AboutUsSection content={content} isEven={isEven} />;
        })}
      </div>
    </div>
  );
};

export default page;
{
  /* <form
onSubmit={addProduct}
className="flex flex-col w-1/3 mx-auto gap-2 p-10 bg-slate-400"
>

<input type="file" accept="image/*" onChange={handleFileChange} />
<button type="submit" disabled={!file || uploading}>
  {uploading ? "Uploading..." : "Upload"}
</button>
</form> */
}

// const router = useRouter();
// const [file, setFile] = useState(null);
// const [uploading, setUploading] = useState(false);
// const handleFileChange = (e: any) => {
//   setFile(e.target.files[0]);
// };

// const addProduct = async (e: any) => {
//   e.preventDefault();
//   if (!file) return;

//   setUploading(true);
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await fetch("/api/images", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();

//     try {
//       const res = await fetch(`http://localhost:3000/api/shop`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           name: "Test",
//           price: 3000,
//           imageUrl:
//             "https://music-shop-storage.s3.eu-west-3.amazonaws.com/" +
//             data.fileName,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update topic");
//       }

//       router.refresh();
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }

//     setUploading(false);
//   } catch (error) {
//     console.log(error);
//     setUploading(false);
//   }
// };
