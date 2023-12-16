"use client";
import ButtonAppBar from "@/components/Navbar";
import DirectionSnackbar from "@/components/Toast";
import TodoItem from "@/components/TodoItem";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Array<TodoItemType>>([]);

  const [entry, setEntry] = useState<TodoItemType>({
    title: "",
    id: Math.random().toString().slice(2),
    isCompleted: false,
  });
  const [showToast, setShowToast] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  useEffect(() => {
    let localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    } else {
      setTodos([]);
    }
  }, []);

  const submitHandler = (): void => {
    // validating entry
    if (!entry.title || entry.title.trim().length === 0) {
      setShowToast({
        show: true,
        message: "Title cannot be empty",
      });
      return;
    }
    localStorage.setItem("todos", JSON.stringify([...todos, entry]));
    setTodos([...todos, entry]);
    setEntry({
      title: "",
      id: Math.random().toString().slice(2),
      isCompleted: false,
    });
    // Adding this line after the setTodos([...todos, entry]); line
    setShowToast({
      show: true,
      message: "Task added",
    });
  };
  const deleteTodoHandler = (id: TodoItemType["id"]): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const toggleTodoHandler = (id: TodoItemType["id"]): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const updateTodoHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <Container maxWidth="md" sx={{ height: "100vh", backgroundColor: "wheat" }}>
      <DirectionSnackbar
        showIt={showToast.show}
        message={showToast.message}
        setToastShow={setShowToast}
      />
      <ButtonAppBar />
      <Stack
        height={"78%"}
        sx={{ overflowY: "scroll" }}
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
      >
        {todos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              deleteHandler={deleteTodoHandler}
              completeHandler={toggleTodoHandler}
              editHandler={updateTodoHandler}
            />
          );
        })}
      </Stack>
      <TextField
        fullWidth
        label={"New Task"}
        sx={{
          zIndex: 100,
          marginTop: "1rem",
        }}
        onChange={(e) => {
          setEntry({ ...entry, title: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler();
          }
        }}
        value={entry.title}
      />
      <Button
        sx={{
          margin: "1rem 0",
        }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        // disabled={title === ""}
      >
        ADD
      </Button>
    </Container>
  );
}
