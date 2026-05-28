"use client";

import { useState, useEffect } from "react";

import { supabase } from "../lib/supabase";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import AdminStats from "./components/AdminStats";

import AdminActions from "./components/AdminActions";

import CategoryForm from "./components/CategoryForm";

import CategoryList from "./components/CategoryList";

import TopicForm from "./components/TopicForm";

import TopicList from "./components/TopicList";

import QuestionForm from "./components/QuestionForm";

import QuestionTable from "./components/QuestionTable";
export default function AdminPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [categories, setCategories] =
    useState<any[]>([]);

  const [topicName, setTopicName] =
    useState("");

  const [topicSlug, setTopicSlug] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("");

  const [topics, setTopics] =
    useState<any[]>([]);

  const [questionText,
    setQuestionText] =
    useState("");

  const [optionA, setOptionA] =
    useState("");

  const [optionB, setOptionB] =
    useState("");

  const [optionC, setOptionC] =
    useState("");

  const [optionD, setOptionD] =
    useState("");

  const [correctAnswer,
    setCorrectAnswer] =
    useState("0");

  const [explanation,
    setExplanation] =
    useState("");

  const [selectedTopic,
    setSelectedTopic] =
    useState("");

  const [questionsList,
    setQuestionsList] =
    useState<any[]>([]);

  const [checkingAuth,
    setCheckingAuth] =
    useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {

    const allowed =
      await checkUser();

    if (!allowed) {
      setCheckingAuth(false);
      return;
    }

    await Promise.all([
      fetchCategories(),
      fetchTopics(),
      fetchQuestions(),
    ]);

    setCheckingAuth(false);
  };

  const checkUser = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace(
        "/admin/login"
      );

      return false;
    }

    const user = session.user;

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
      profile?.role !== "admin"
    ) {

      toast.error(
        "Unauthorized Access"
      );

      router.replace("/");

      return false;
    }

    return true;
  };

  const fetchCategories =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("categories")
        .select("*")
        .order("id");

      if (error) {
        console.log(error);
        return;
      }

      setCategories(data || []);
    };

  const fetchTopics =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("topics")
        .select("*")
        .order("id");

      if (error) {
        console.log(error);
        return;
      }

      setTopics(data || []);
    };

  const fetchQuestions =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("questions")
        .select("*")
        .order("id");

      if (error) {
        console.log(error);
        return;
      }

      setQuestionsList(
        data || []
      );
    };

  const handleSave =
    async () => {

      const { error } =
        await supabase
          .from("categories")
          .insert([
            {
              name,
              slug,
            },
          ]);

      if (error) {
        toast.error(
          error.message
        );

        return;
      }

      toast.success(
        "Category Added"
      );

      setName("");
      setSlug("");

      fetchCategories();
    };

  const handleTopicSave =
    async () => {

      const { error } =
        await supabase
          .from("topics")
          .insert([
            {
              name: topicName,
              slug: topicSlug,
              category_slug:
                selectedCategory,
            },
          ]);

      if (error) {
        toast.error(
          error.message
        );

        return;
      }

      toast.success(
        "Topic Added"
      );

      setTopicName("");
      setTopicSlug("");
      setSelectedCategory("");

      fetchTopics();
    };

  const handleQuestionSave =
    async () => {

      if (
        !questionText.trim() ||
        !optionA.trim() ||
        !optionB.trim() ||
        !optionC.trim() ||
        !optionD.trim() ||
        !selectedTopic
      ) {

        toast.error(
          "Fill all fields"
        );

        return;
      }

      const { error } =
        await supabase
          .from("questions")
          .insert([
            {
              question:
                questionText,

              option_a:
                optionA,

              option_b:
                optionB,

              option_c:
                optionC,

              option_d:
                optionD,

              correct_answer:
                Number(
                  correctAnswer
                ),

              explanation,

              topic_slug:
                selectedTopic,
            },
          ]);

      if (error) {

        toast.error(
          error.message
        );

        return;
      }

      toast.success(
        "Question Added"
      );

      setQuestionText("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("0");
      setExplanation("");
      setSelectedTopic("");

      fetchQuestions();
    };

  const deleteCategory =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete category?"
        );

      if (!confirmed) return;

      const { error } =
        await supabase
          .from("categories")
          .delete()
          .eq("id", id);

      if (error) {

        toast.error(
          error.message
        );

        return;
      }

      fetchCategories();
    };

  const deleteTopic =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete topic?"
        );

      if (!confirmed) return;

      const { error } =
        await supabase
          .from("topics")
          .delete()
          .eq("id", id);

      if (error) {

        toast.error(
          error.message
        );

        return;
      }

      fetchTopics();
    };

  const deleteQuestion =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete question?"
        );

      if (!confirmed) return;

      const { error } =
        await supabase
          .from("questions")
          .delete()
          .eq("id", id);

      if (error) {

        toast.error(
          error.message
        );

        return;
      }

      fetchQuestions();
    };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-lg">
          Checking Admin Access...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <AdminStats
        categories={categories}
        topics={topics}
        questions={questionsList}
      />

      <AdminActions
        router={router}
        supabase={supabase}
      />

      <CategoryForm
        name={name}
        setName={setName}
        slug={slug}
        setSlug={setSlug}
        handleSave={handleSave}
      />

      <TopicForm
        topicName={topicName}
        setTopicName={
          setTopicName
        }
        topicSlug={topicSlug}
        setTopicSlug={
          setTopicSlug
        }
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        categories={categories}
        handleTopicSave={
          handleTopicSave
        }
      />

      <TopicList
        topics={topics}
        questionsList={
          questionsList
        }
        deleteTopic={
          deleteTopic
        }
      />

      <QuestionForm
        questionText={
          questionText
        }
        setQuestionText={
          setQuestionText
        }
        optionA={optionA}
        setOptionA={
          setOptionA
        }
        optionB={optionB}
        setOptionB={
          setOptionB
        }
        optionC={optionC}
        setOptionC={
          setOptionC
        }
        optionD={optionD}
        setOptionD={
          setOptionD
        }
        correctAnswer={
          correctAnswer
        }
        setCorrectAnswer={
          setCorrectAnswer
        }
        explanation={
          explanation
        }
        setExplanation={
          setExplanation
        }
        selectedTopic={
          selectedTopic
        }
        setSelectedTopic={
          setSelectedTopic
        }
        topics={topics}
        handleQuestionSave={
          handleQuestionSave
        }
      />

      <QuestionTable
        questionsList={
          questionsList
        }
        deleteQuestion={
          deleteQuestion
        }
      />

      <CategoryList
        categories={categories}
        deleteCategory={
          deleteCategory
        }
      />

    </main>
  );
}