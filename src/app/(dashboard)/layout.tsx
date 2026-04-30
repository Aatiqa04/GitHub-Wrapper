import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
