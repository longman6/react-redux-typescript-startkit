import React, { useState } from 'react';
interface Props {
  onAddTodo : ( text: string) => void
}
const AddTodoForm = ({onAddTodo} : Props) => {
  const [ text, setText ] = useState<string>('');
  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text)
    setText('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={(e)=>setText(e.target.value)} value={text} type="text" placeholder="할일을 기록하세요"/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default AddTodoForm;