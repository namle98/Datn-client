import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../service/category.service";

function Home() {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });
  return <Link to="user/history">Home</Link>;
}

export default Home;
