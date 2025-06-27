import { LegacyCard, ResourceItem, ResourceList } from "@shopify/polaris";
import { TodoItem } from "./Todo";
import { useState } from "react";
import { CheckboxIcon, DeleteIcon, XCircleIcon } from "@shopify/polaris-icons";
import useUpdate from "../../hooks/useUpdateApi";
import useCreate from "../../hooks/useCreateApi";

export const TodoList = ({ todos, setTodos }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const { updateData: updateTodos, loading: updateLoading } = useUpdate('/todos');
    const { createData: deleteTodos, loading: createLoading } = useCreate('/todos/delete-many');

    const handleComplete = async () => {
        try {
            const updateTodoList = selectedItems.map(id => ({ id, completed: true }));
            await updateTodos(updateTodoList);
            setTodos(prev => prev.map(todo => selectedItems.includes(todo.id) ? { ...todo, completed: true } : { ...todo }));
            setSelectedItems([]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedItems([]);
        }
    }

    const handleIncomplete = async () => {
        try {
            const updateTodoList = selectedItems.map(id => ({ id, completed: false }));
            await updateTodos(updateTodoList);
            setTodos(prev => prev.map(todo => selectedItems.includes(todo.id) ? { ...todo, completed: false } : { ...todo }));
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedItems([]);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTodos({ ids: selectedItems });
            setTodos(prev => prev.filter(todo => !selectedItems.includes(todo.id)))
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedItems([]);
        }
    }

    const resourceName = {
        singular: 'todo',
        plural: 'todos',
    };

    const promotedBulkActions = [
        {
            icon: CheckboxIcon,
            content: 'Complete todos',
            onAction: handleComplete,
        },
    ];

    const bulkActions = [
        {
            icon: XCircleIcon,
            destructive: false,
            content: 'Incomplete todos',
            onAction: handleIncomplete,
        },
        {
            icon: DeleteIcon,
            destructive: true,
            content: 'Delete todos',
            onAction: handleDelete,
        },
    ];

    const renderItem = (todo) => (
        <ResourceItem
            id={todo?.id}
            accessibilityLabel={`View details for ${todo?.title}`}
        >
            <TodoItem {...todo} onSuccess={setTodos} />
        </ResourceItem>
    );

    return (
        <LegacyCard>
            <ResourceList
                loading={updateLoading || createLoading}
                resourceName={resourceName}
                items={todos || []}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}
            />
        </LegacyCard>
    );
}