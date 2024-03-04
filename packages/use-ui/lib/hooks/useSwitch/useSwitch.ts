import cls from "classnames";
import { useCallback, useMemo, useState } from "react";
import { CommonTypes, ResultSwitchProps } from "../../interfaces";

interface SwitchOptions extends CommonTypes.ComponentDefaultAttributes {
  name?: string | undefined;
  disabled?: boolean | undefined;
  value?: boolean | undefined;
  onToggle?: (value: boolean) => void;
}

const useSwitch = (props: SwitchOptions = {}): ResultSwitchProps => {
  const { value, id, className, onToggle, disabled, name } = props;
  const [isChecked, setIsChecked] = useState<boolean>(value || false);

  const toggleSwitch = useCallback((): void => {
    setIsChecked(!isChecked);
    onToggle?.(!isChecked);
  }, [isChecked]);

  const _className = useMemo(
    (): string =>
      cls(className, "UI_switch", {
        [`UI_switch--checked`]: isChecked,
        [`UI_switch--disabled`]: disabled,
      }),
    [isChecked, className, disabled]
  );

  return {
    id,
    name,
    type: "checkbox",
    checked: isChecked,
    disabled,
    onChange: toggleSwitch,
    tabIndex: 0,
    className: _className,
    role: "switch",
    "aria-checked": isChecked,
  };
};

export default useSwitch;
