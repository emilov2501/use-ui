import { useSwitch } from "useui-ts";

export const Switch = () => {
  const { inputProps } = useSwitch({
    id: "id",
    name: "form",
    onChange: (value) => console.log(value),
    className: "myclass",
  });
  return (
    <label htmlFor="id">
      <input {...inputProps} />
      daun
    </label>
  );
};
