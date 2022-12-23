import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { formHookValidationSchema } from "./validations/formHookValidation";
import { useYupValidationResolver } from "./hooks/useYupValidationResolver";

import "./App.css";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  developer: boolean;
};
let renders: number = 0;

function App() {
  const resolver = useYupValidationResolver(formHookValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ resolver });
  renders++;
  console.log({ renders, errors });

  const formValuesHandler = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Form onSubmit={handleSubmit(formValuesHandler)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control {...register("firstName")} />
          {errors.firstName && <small>{errors.firstName.message}</small>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control {...register("lastName")} />
          {errors.lastName && <small>{errors.lastName.message}</small>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            {...register("age", { valueAsNumber: true })}
            type="number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Select {...register("gender")}>
            <option value="">Select...</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="areYouDev">
          <Form.Check
            {...register("developer")}
            type="checkbox"
            label="Are you a developer?"
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default App;
