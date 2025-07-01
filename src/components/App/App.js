import { Frame, Page } from '@shopify/polaris';
import { Header } from '../Header/TopBar';
import { TodoList } from '../TodoList/TodoList';
import { useCallback, useState } from 'react';
import { logo } from '../../constants/logo';

export default function App() {
  const [modalActive, setModalActive] = useState(false);
  const toggleModal = useCallback(() => setModalActive((prev) => !prev), []);

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
        <TodoList 
          modalActive={modalActive}
          toggleModal={toggleModal}
        />
      </Page>
    </Frame>
  )
}