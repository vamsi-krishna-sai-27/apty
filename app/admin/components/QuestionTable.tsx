import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function QuestionTable({
  questionsList,
  deleteQuestion,
}: any) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-4">
        Questions
      </h2>

      <div className="border rounded-lg">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Question
              </TableHead>

              <TableHead>
                Topic
              </TableHead>

              <TableHead>
                Correct
              </TableHead>

              <TableHead>
                Action
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {questionsList.map(
              (question: any) => (
                <TableRow
                  key={question.id}
                >
                  <TableCell className="max-w-[400px] truncate">
                    {
                      question.question
                    }
                  </TableCell>

                  <TableCell>
                    {
                      question.topic_slug
                    }
                  </TableCell>

                  <TableCell>
                    {
                      [
                        "A",
                        "B",
                        "C",
                        "D",
                      ][
                        question.correct_answer
                      ]
                    }
                  </TableCell>

                  <TableCell>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        deleteQuestion(
                          question.id
                        )
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>
              )
            )}

          </TableBody>

        </Table>

      </div>

    </div>
  );
}