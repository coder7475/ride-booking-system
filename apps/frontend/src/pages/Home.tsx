import { useEffect } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

const Index = () => {
  const { data } = useUserInfoQuery(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.email) {
      navigate("/dashboard");
    }
  }, [data?.data?.email, navigate]);

  return <div>HomePage</div>;
};

export default Index;
