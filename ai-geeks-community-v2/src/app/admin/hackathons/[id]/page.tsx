import AdminHackathonsConsole from "@/components/admin/AdminHackathonsConsole";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminHackathonScopedPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminHackathonsConsole initialHackathonId={id} />;
}
