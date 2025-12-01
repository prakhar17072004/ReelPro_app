"use client ";
import React, {  useState } from "react";
import {  IKUpload } from "imagekitio-react";
import { Loader2 } from "lucide-react";
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadProps) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}




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

  const handleProgress = (evt:ProgressEvent) => {
    if(evt.lengthComputable && onProgress){
      const percentComplete =(evt.loaded /evt.total)*100;
      onProgress(Math.round(percentComplete));
    }
    
  };

  const handleStartUpload = () => {
   setUploading(true);
    setError(null);

  const validateFile = (file: File) => {
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
    <div className="space-y-4">
        <IKUpload 
        fileName={fileType === "video" ?"video":"image"}
        useUniqueFileName={true} 
        validateFile={validateFile}   
        onError={onError}  
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload} 
        accept={fileType==="video"?"video/*":"images/*"}
        className="file-input file-input-bordered w-full"
        folder={fileType==="video"? "/video":"/image"} 

        />
        {
          uploading && (
            <div className=" flex items-center gap-2 text-sm ">
              <Loader2 className="animate-spin w-4 h-4"/>
              <span>Uploading...</span>
              </div>
          )
        }
        {error && (
          <div className="text-error text-sm ">{error}</div>
        )}

  </div>
  );
}
 
}
