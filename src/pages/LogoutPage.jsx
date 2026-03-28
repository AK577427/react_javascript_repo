// LogoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();

//   useState(() => {
//     const storedToken = window.localStorage.getItem("token");
//     setToken(storedToken);
//   }, []);   

  useEffect(() => {
    window.localStorage.removeItem("token");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
export default LogoutPage;