import React, { useEffect, useState, useContext, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { PreviewContext } from "../../context/PreviewContext";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

// Import Templates
// Lazy loading would be ideal here too, but for now we import directly to ensure availability
import ModernDark from "../../features/portfolio/templates/ModernDark/ModernDark";
import MinimalLight from "../../features/portfolio/templates/MinimalLight/MinimalLight";
import CreativeGradient from "../../features/portfolio/templates/CreativeGradient/CreativeGradient";

export default function Portfolio() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  async function getUserDetails() {
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");

      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find(
        (doc) => doc.data().userName === userId
      );
      if (userDoc) {
        const userData = userDoc.data();
        let projects = [];

        // Fetch projects for this user
        if (userData.uid) {
          const projectsRef = collection(firestore, "projects");
          const q = query(projectsRef, where("userID", "==", userData.uid));
          const querySnapshot = await getDocs(q);
          projects = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        }

        setPreviewData({
          ...userData.previewData,
          projects: projects
        });
        setLoading(false);
      } else {
        console.error("No user found");
        // Handle the case where the document is not found
        // Maybe navigate to 404
      }
    } catch (error) {
      console.error("Error finding user", error);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  // Decide which template to render
  const renderTemplate = () => {
    const templateId = previewData?.templateId || 'modern-dark';

    switch (templateId) {
      case 'minimal-light':
        return <MinimalLight />;
      case 'creative-gradient':
        return <CreativeGradient />;
      case 'modern-dark':
      default:
        return <ModernDark />;
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center bg-black">
          <ReactLoading type="bubbles" height={"60px"} width={"60px"} color="#804dee" />
        </div>
      ) : (
        renderTemplate()
      )}
    </div>
  );
}

