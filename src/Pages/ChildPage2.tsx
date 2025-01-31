import React, { useState, useEffect } from "react";

const ChildPage2 = () => {
  const [todos, setTodos] = useState<
    { text: string; done: boolean; category: string; date: string }[]
  >([]);

  return (
    <div>
      <h2>Child Page 2</h2>
      <p>This is the second child page content.</p>
    </div>
  );
};

export default ChildPage2;
