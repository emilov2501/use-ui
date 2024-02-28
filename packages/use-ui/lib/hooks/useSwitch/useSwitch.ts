import cls from "classnames";
import { useCallback, useMemo, useState } from "react";
import { SwitchOptions, SwitchProps } from "../../interfaces";

const useSwitch = (props: SwitchOptions = {}): SwitchProps => {
  const { value, id, className, onToggle } = props;
  const [isChecked, setIsChecked] = useState<boolean>(value || false);

  const toggleSwitch = useCallback((): void => {
    setIsChecked(!isChecked);
    onToggle?.(!isChecked);
  }, [isChecked]);

  const _className = useMemo(
    (): string =>
      cls(className, "Switch__control", {
        [`Switch__control--checked`]: isChecked,
      }),
    [isChecked, className]
  );

  return {
    id,
    type: "checkbox",
    checked: isChecked,
    onChange: toggleSwitch,
    tabIndex: 0,
    className: _className,
    role: "switch",
    "aria-checked": isChecked,
  };
};

export default useSwitch;
