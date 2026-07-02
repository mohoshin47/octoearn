import Task from "./pages/Task";
import { initAdsgram } from "./utils/adsgram";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    initAdsgram();
  }, []);
  return <Task />;
}