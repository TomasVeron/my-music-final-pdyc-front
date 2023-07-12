import { Container, Input, Text } from "@nextui-org/react";

const AppInput = ({ error, label, touched, warning, input }) => {
  return (
    <>
      <Container display="flex" direction="column" justify="space-between" alignItems="center">
        {input.type === "password" ? (
          <Input.Password {...input} bordered color="secondary" fullWidth clearable label={label} type={input.type} />
        ) : (
          <Input {...input} bordered color="secondary" fullWidth clearable label={label} type={input.type} />
        )}
        {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
      </Container>
    </>
  );
};

export default AppInput;
