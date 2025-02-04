import cloudinary from '../../config/cloudinary';
import HandleCloudinaryType from './type';

export const handleCloudinary = async (
  isImage: string,
  folderName: string
): Promise<HandleCloudinaryType> => {
  try {
     const result = await cloudinary.uploader.upload(isImage, {
      folder: folderName,
     });

     const importData: HandleCloudinaryType = {
      secure_url: result.secure_url,
      public_id: result.public_id
     }
     return importData;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`failed to upload image to cloudinary / ${e.message}`);
    };
    throw new Error(`failed to upload image to cloudinary`);
  };
};