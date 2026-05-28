export default function QuestionForm({
  questionText,
  setQuestionText,
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  optionC,
  setOptionC,
  optionD,
  setOptionD,
  correctAnswer,
  setCorrectAnswer,
  explanation,
  setExplanation,
  selectedTopic,
  setSelectedTopic,
  topics,
  handleQuestionSave,
}: any) {
  return (
    <div className="border rounded-lg p-6 mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        Add Question
      </h2>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Question"
          value={questionText}
          onChange={(e) =>
            setQuestionText(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Option A"
          value={optionA}
          onChange={(e) =>
            setOptionA(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Option B"
          value={optionB}
          onChange={(e) =>
            setOptionB(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

      </div>

    </div>
  );
}