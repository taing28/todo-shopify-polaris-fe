import { Badge, Button, InlineStack, Text } from "@shopify/polaris";
import useUpdate from "../../hooks/useUpdateApi";
import useDelete from "../../hooks/useDeleteApi";

export const TodoItem = ({ id, title, completed, onSuccess }) => {
    const { updateData: updateTodo, loading: updateLoading } = useUpdate(`/todos/${id}`);
    const { deleteData: deleteTodo, loading: deleteLoading} = useDelete(`/todos/${id}`);

    const handleToggleComplete = async () => {
        try {
            await updateTodo({ completed: !completed });
            onSuccess(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTodo();
            onSuccess(prev => prev.filter(todo => todo.id !== id));
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <InlineStack align="space-between" blockAlign="center">
                <Text variant="bodyMd" fontWeight="bold" as="h3" textDecorationLine={completed ? "line-through" : ""}>
                    {title}
                </Text>
                <InlineStack align="end" gap={"200"}>
                    <Badge variant="bodyMd" tone={completed ? "success" : "attention"}>
                        {completed ? "Complete" : "Incomplete"}
                    </Badge>
                    <Button onClick={handleToggleComplete} loading={updateLoading} disabled={deleteLoading}>{completed ? "Incomplete" : "Complete"}</Button>
                    <Button tone="critical" onClick={handleDelete} loading={deleteLoading} disabled={updateLoading}>Delete</Button>
                </InlineStack>
            </InlineStack>
    );
}