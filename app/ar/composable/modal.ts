import { useState } from "react";

export function useModal() {
  const [visible, setState] = useState<'hide' | 'show' | 'ended'>('hide');
  const reject = () => {
    setState('ended');
  }

  return {
    visible,
    reject,
    setState,
  }
}