import { useSwitch } from "useui-ts";

export const Switch = () => {
  const props = useSwitch({
    id: "id",
    name: "form",
    onToggle: (value) => console.log(value),
    className: "myclass",
  });
  return (
    <label htmlFor="id">
      <input {...props} />
      swtich
    </label>
  );
};
