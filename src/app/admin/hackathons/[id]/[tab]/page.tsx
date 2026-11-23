import AdminHackathonsConsole, {
  AdminViewTab,
} from "@/components/admin/AdminHackathonsConsole";

interface PageProps {
  params: Promise<{ id: string; tab: string }>;
}

export default async function AdminHackathonTabScopedPage({
  params,
}: PageProps) {
  const { id, tab } = await params;
  return (
    <AdminHackathonsConsole
      initialHackathonId={id}
      initialTab={(tab as AdminViewTab) || "analytics"}
    />
  );
}
