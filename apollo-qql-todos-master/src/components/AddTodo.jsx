import { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client'
import { ADD_TODO, ALL_TODO } from '../apollo/todos';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, {error}] = useMutation(ADD_TODO, { //addTodo - фкнция действия, по которой запускается мутация, error(тут еще может быть загрузка и данные)) 
    // refetchQueries: [ //дополнительные действия
    //   { query: ALL_TODO }
    // ],
    update(cache, { data: { newTodo } }) { //обновление кеша вручную
      const { todos } = cache.readQuery({ query: ALL_TODO });

      cache.writeQuery({ //перезаписываем кеш
        query: ALL_TODO,
        data: {
          todos: [newTodo, ...todos]
        }
      })
    }
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({ // сюда передаем объект для запроса
        variables: {
          title: text,
          completed: false,
          userId: 123,
        },
      });
      setText('');
    }
  }

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  }

  if (error) {
    return <h2>Error...</h2>
  }

  return (
    <FormControl display={'flex'} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
