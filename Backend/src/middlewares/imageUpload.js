import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

const upload = async (req, reply) => {
  try {
    const parts = req.parts();
    const fields = {};
    const fileBuffers = [];

    for await (const part of parts) {
      if (part.file) {
        const buffer = await part.toBuffer();
        fileBuffers.push({
          buffer,
          filename: `${Date.now()}_${part.filename}`
        });
      } else {
        fields[part.fieldname] = part.value;
      }
    }

    const imageUrls = [];
    const uploadDir = "./uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    for (const file of fileBuffers) {
      const filePath = path.join(uploadDir, file.filename);
      await writeFile(filePath, file.buffer);
      imageUrls.push(`/uploads/${file.filename}`);  
    }

    req.uploadedFiles = imageUrls;
    req.body = fields; 

    
  } catch (error) {
    console.error("Upload error:", error);
    reply.code(500).send({ error: "File upload failed" });
    return false;
  }
};

export default upload;