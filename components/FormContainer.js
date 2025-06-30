export default function FormContainer({ className, children, onSubmit }) {
  function performSubmit(event) {
    event.preventDefault();
    event.target.querySelector("input:focus")?.blur();
    onSubmit?.(
      Array.from(event.target.querySelectorAll("input, textarea")).reduce(
        (result, input) => {
          let value = input.value;
          if (input.type === "radio" && !input.checked) {
            value = result[input.name];
          }
          if (input.type === "checkbox") {
            value = result[input.name] || [];
            if (input.checked) value.push(input.value);
          }
          if (input.type === "hidden") {
            value = result[input.name] || [];
            value.push(input.value);
          }
          return {
            ...result,
            [input.name]: value,
          };
        },
        {}
      )
    );
  }

  return (
    <form className={className} onSubmit={performSubmit}>
      {children}
    </form>
  );
}
