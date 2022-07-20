import { useState } from "react";

import Button from "./Button";

const Counter = (props) => {
  const [counter, setCounter] = useState(0);

  const onClickAddHandler = () => {
    setCounter((prevCounter) => prevCounter++);
  };

  const onClickSubstractHandler = () => {
    setCounter((prevCounter) => prevCounter--);
  };

  return (
    <div>
      <span>{counter}</span>
      <Button text={"-"} onClick={onClickSubstractHandler} />
      <Button text={"+"} onClick={onClickAddHandler} />
    </div>
  );
};

export default Counter;
