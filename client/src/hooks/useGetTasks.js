import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTasks } from "../api/tasksApi";

export const useGetTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const data = await getTasks();
                setTasks(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        };
        fetchTasks();
    }, []);

    return { loading, tasks};
}