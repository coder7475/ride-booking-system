import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { AwardIcon, Clock, TestTubeDiagonal, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router";

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
