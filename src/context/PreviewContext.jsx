import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [previewData, setPreviewData] = useState({
    displayName: "",
    tagline: "",
    overview: "",
    services: [],
    experiences: [],
    skills: [],
    templateId: "modern-dark" // Default template
  });

  async function handleUserData() {
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");

      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      if (userDoc) {
        if (userDoc.data().previewData) {
          setPreviewData({
            ...userDoc.data().previewData,
            templateId: userDoc.data().previewData.templateId || "modern-dark"
          });
        }
      } else {
        console.error("Document with the given UID not found.");
      }
    } catch (error) {
      console.error("Error fetching preview data:", error);
    }
  }

  const updateTemplateId = async (newTemplateId) => {
    // Optimistic update
    setPreviewData(prev => ({ ...prev, templateId: newTemplateId }));

    if (user) {
      try {
        // We need to find the user document ID first since it might not be the UID
        // In a better schema, user.uid would be the doc ID, but here we search
        const firestore = getFirestore();
        const userCollection = collection(firestore, "users");
        const snapshot = await getDocs(userCollection);
        const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);

        if (userDoc) {
          const userRef = doc(db, "users", userDoc.id);
          await updateDoc(userRef, {
            "previewData.templateId": newTemplateId
          });
        }
      } catch (error) {
        console.error("Error updating template ID:", error);
        // Revert on error? For now, we just log it.
      }
    }
  };

  useEffect(() => {
    if (!loading || user) {
      handleUserData();
    }
  }, [user, loading]);

  return (
    <PreviewContext.Provider value={[previewData, setPreviewData, updateTemplateId]}>
      {props.children}
    </PreviewContext.Provider>
  )
}