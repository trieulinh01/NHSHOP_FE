import axios from 'axios';
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
const CLOUDINARY_UPLOAD_PRESET = 'nhshop';
const CLOUDINARY_FOLDER = 'NodeJs';
const CLOUDINARY_NAME = 'dmae1yqmc';
export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', CLOUDINARY_FOLDER);

try{
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,  formData,);
   if(response.status === 200){
       return response.data;
   }else{
    console.log(response.statusText);
   }
}catch(error){
console.log(error);

}
   
}