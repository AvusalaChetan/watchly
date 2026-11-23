import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${crypto.randomUUID()}${ext}`);
//   },
// });

const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
export const uploads = multer({
  storage,
  limits: {fileSize: 1024 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const isAllowed = allowedTypes.includes(file.mimetype);
    cb(null, isAllowed);
  },
});
