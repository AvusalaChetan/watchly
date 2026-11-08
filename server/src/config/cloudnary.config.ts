import {v2 as cloudinary} from "cloudinary";
import {config} from "../config/config.js";


 
// console.log(await cloudinary.api.ping());
 
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure:true,
});

export default cloudinary;
