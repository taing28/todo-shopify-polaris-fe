import { Frame, Page } from '@shopify/polaris';
import { Header } from '../Header/TopBar';
import { TodoList } from '../TodoList/TodoList';
import { useCallback, useState } from 'react';
import { CreateTodoModal } from '../TodoList/CreateTodoModal';
import useFetchApi from '../../hooks/useFetchApi';
import { logo } from '../../constants/logo';
import { TodoListSkeleton } from '../TodoList/TodoListSkeleton';

export default function App() {
  const [modalActive, setModalActive] = useState(false);
  const { data: todos, loading, setData: setTodos } = useFetchApi('/todos');

  const toggleModal = useCallback(() => setModalActive((prev) => !prev), []);

  if (loading) return (
    <Frame>
      <TodoListSkeleton />
    </Frame>
  );

  return (
    <Frame topBar={<Header />} logo={logo}>
      <Page
        title="Todoes"
        primaryAction={{
          content: 'Create',
          disabled: false,
          onAction: toggleModal,
        }}
      >
        (<TodoList todos={todos} setTodos={setTodos} />)
      </Page>

      <CreateTodoModal
        active={modalActive}
        toggleModal={toggleModal}
        onSuccess={setTodos}
      />
    </Frame>
  )
}