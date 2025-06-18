// src/lib/firestoreService.ts
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// ✅ Safer addMentor with validation and logging
export const addMentor = async (uid: string, name: string, email: string) => {
  if (!uid || !name || !email) {
    console.warn("addMentor called with missing fields:", { uid, name, email });
    throw new Error("Missing required fields for mentor.");
  }

  await addDoc(collection(db, "mentors"), {
    uid,
    name,
    email,
    createdAt: Timestamp.now(),
  });
};

// ✅ Safer addUser with validation and logging
export const addUser = async (
  uid: string,
  name: string,
  email: string,
  role: "mentor" | "mentee"
) => {
  if (!uid || !name || !email || !role) {
    console.warn("addUser called with missing fields:", { uid, name, email, role });
    throw new Error("Missing required fields for user.");
  }

  await addDoc(collection(db, "users"), {
    uid,
    name,
    email,
    role,
    createdAt: Timestamp.now(),
  });
};
