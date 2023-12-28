import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Music Shop | About",

  description: "Our History",
};
const layout = ({ children }: { children: React.ReactElement }) => {
  return <div>{children}</div>;
};

export default layout;
