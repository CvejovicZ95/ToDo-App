import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTasks } from "../api/tasksApi";
import { getAllUsers } from "../api/usersApi";


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

export const useGetAllUsers = () => { 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { loading, users };
};