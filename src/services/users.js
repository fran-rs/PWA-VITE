import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../src/firebase";

export const updateUserInDB = async (uid, data) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return setDoc(ref, { uid, ...data }, { merge: true });
  }

  return updateDoc(ref, data);
};
