import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function AdminStats({
  categories,
  topics,
  questions,
}: any) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Categories
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {categories.length}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Topics
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {topics.length}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Questions
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {questions.length}
          </h2>
        </CardContent>
      </Card>

    </div>
  );
}