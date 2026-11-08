import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

export const uploads = multer({
  storage,
  limits: {fileSize: 1024 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype.startsWith("video/") 
      || file.mimetype.startsWith("image/");
     cb(null, ok);
  },
});
