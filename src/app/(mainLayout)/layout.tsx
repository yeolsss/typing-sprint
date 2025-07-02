import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <div className="mx-auto mt-5 flex">{children}</div>;
}
