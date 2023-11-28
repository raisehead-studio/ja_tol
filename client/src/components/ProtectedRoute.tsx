import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const ac = localStorage.getItem("token");
  const rt = localStorage.getItem("rf_token");

  useEffect(() => {
    if (!ac || !rt) {
      navigate("/login");
    }
  }, [ac, rt, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
