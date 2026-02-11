import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { useEffect, useState } from "react";
import FullScreenLoader from "./components/FullScreenLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setLoading(false);
      return;
    }

    const handleLoad = () => setLoading(false);
    document.addEventListener("DOMContentLoaded", handleLoad);

    return () => document.removeEventListener("DOMContentLoaded", handleLoad);
  }, []);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
