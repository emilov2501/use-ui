import cls from "classnames";
import { useCallback, useState } from "react";
import { SwitchOptions, SwitchProps } from "../interfaces";

type UseSwichHookResult = {
  inputProps: SwitchProps;
};

const useSwitch = (props?: SwitchOptions): UseSwichHookResult => {
  const { value, id, className, onChange } = props || {};
  const [isChecked, setIsChecked] = useState<boolean>(value || false);

  const toggleSwitch = useCallback(() => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  }, [isChecked]);

  const inputProps: SwitchProps = {
    id,
    type: "checkbox",
    className: cls(className, "Switch__control", {
      [`Switch__control--checked`]: isChecked,
    }),
    role: "switch",
    checked: isChecked,
    "aria-checked": isChecked,
    onChange: toggleSwitch,
    tabIndex: 0,
  };

  return {
    inputProps,
  };
};

export default useSwitch;
