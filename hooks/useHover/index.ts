import { useEffect } from 'react';
import useBoolean from '../useBoolean';
import { BasicTarget, getTargetElement } from '../utils/domTarget';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEffect(() => {
    const targetElement = getTargetElement<HTMLElement | Element | Window | Document>(target, window);
    if(!targetElement?.addEventListener) {
      return;
    }

    targetElement.addEventListener('mouseenter', () => {
      onEnter?.();
      setTrue();
      onChange?.(true);
    })

    targetElement.addEventListener('mouseleave',() => {
      onLeave?.();
      setFalse();
      onChange?.(false);
    },)

    return () => {
      targetElement.removeEventListener('mouseenter', () => {
        onEnter?.();
        setTrue();
        onChange?.(true);
      })

      targetElement.removeEventListener('mouseleave',() => {
        onLeave?.();
        setFalse();
        onChange?.(false);
      },)
    };
  }, [])

  return state;
};
