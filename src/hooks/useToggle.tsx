import React, { useCallback, useState, Dispatch } from "react";

const useToggle = (
  init: boolean
): [boolean, () => void, Dispatch<React.SetStateAction<boolean>>] => {
  const [isTrue, setTrue] = useState<boolean>(init);
  const toggle = useCallback(() => setTrue((prevState) => !prevState), []);

  return [isTrue, toggle, setTrue];
};

export default useToggle;
