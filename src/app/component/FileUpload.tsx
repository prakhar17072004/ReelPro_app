"use client ";
import React, { useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { Loader } from "lucide-react";
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadProps) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// const authenticator = async ()=>{
//     try {
//         const response = await fetch("/api/imagekit-auth");
//         if(!response.ok){
//             const errorText = await response.text();
//             throw new Error(`Request failed  with status `)

//         }
//     } catch (error) {

//     }
// }

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  // const ikUploadRefTest = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  const handleSuccess = (response: IKUploadProps) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response); //here we pass the response to onSuccess props
  };

  const handleProgress = () => {
    setUploading(true);
    setError(null);
  };

  const handleStartUpload = (evt: ProgressEvent) => {
    console.log("Progress", evt);
  };

  const validate = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("/video")) {
        setError("Please upload video file");
        return false;
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("Video must be less than 1000 MB");
      return false;
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid file(JPEG,JPG,PNG,WEBP)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Video must be less than 5 MB");
        return false;
      }
    }
    return false;
  };
  return (
    <div className="space-y-2">
        <IKUpload file>

        </IKUpload>

  </div>
  )
 
}
