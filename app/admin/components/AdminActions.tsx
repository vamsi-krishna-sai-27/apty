import { Button } from "@/components/ui/button";

export default function AdminActions({
  router,
  supabase,
}: any) {
  return (
    <div className="flex gap-2 mb-6">

      <Button
        variant="destructive"
        onClick={async () => {
          await supabase.auth.signOut();

          router.push("/admin/login");
        }}
      >
        Logout
      </Button>

      <Button
        onClick={() =>
          router.push("/admin/analytics")
        }
      >
        Analytics
      </Button>

    </div>
  );
}