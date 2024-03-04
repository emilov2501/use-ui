import cls from "classnames";
import { useCallback, useMemo, useState } from "react";
import { CommonTypes, ResultSwitchProps } from "../../interfaces";

interface SwitchOptions extends CommonTypes.ComponentDefaultAttributes {
  name?: string | undefined;
  value?: boolean | undefined;
  onToggle?: (value: boolean) => void;
}

const useSwitch = (props: SwitchOptions = {}): ResultSwitchProps => {
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
