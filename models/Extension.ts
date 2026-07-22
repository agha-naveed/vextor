import mongoose, { Schema, Document, model, models } from "mongoose";

// 1. TypeScript Interface for the Extension
export interface IExtension extends Document {
  name: string;             // Unique identifier (e.g., "vextor-auto-formatter")
  displayName: string;      // Human-readable name (e.g., "Vextor Auto Formatter")
  version: string;          // e.g., "1.0.0"
  developerId: string;      // ID of the user who uploaded it
  description: string;      // Short description of what it does
  downloadUrl: string;      // Cloudinary raw .zip URL
  iconUrl?: string;         // Optional Cloudinary image URL for the marketplace UI
  permissions: string[];    // e.g., ["use-fs", "use-network"]
  status: "APPROVED" | "PENDING" | "BANNED";
  downloads: number;        // Tracking total installs
  repositoryUrl?: string;   // Optional GitHub link
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema Definition
const ExtensionSchema = new Schema<IExtension>(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/, // Force valid slug formatting (no spaces or weird symbols)
    },
    displayName: { 
      type: String, 
      required: true,
      trim: true
    },
    version: { 
      type: String, 
      required: true,
      match: /^\d+\.\d+\.\d+$/ // Force standard Semantic Versioning (e.g., 1.0.4)
    },
    developerId: { 
      type: String, 
      required: true,
      index: true // Indexed to easily fetch "Extensions by this developer"
    },
    description: { 
      type: String, 
      required: true,
      maxLength: 250 // Keep it concise for the UI cards
    },
    downloadUrl: { 
      type: String, 
      required: true 
    },
    iconUrl: { 
      type: String,
      default: ""
    },
    permissions: { 
      type: [String], 
      default: [] 
    },
    status: { 
      type: String, 
      enum: ["APPROVED", "PENDING", "BANNED"], 
      default: "APPROVED" 
    },
    downloads: { 
      type: Number, 
      default: 0 
    },
    repositoryUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// 3. Next.js Safe Model Export
export const Extension = models.Extension || model<IExtension>("Extension", ExtensionSchema);