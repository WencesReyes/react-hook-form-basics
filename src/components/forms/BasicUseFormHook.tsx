import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  developer: boolean;
};
let renders: number = 0;

function BasicUseFormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();
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
          <Form.Control
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && <small>{errors.firstName.message}</small>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            {...register("lastName", {
              required: "This field is required",
              maxLength: { value: 4, message: "Exceeded value" },
            })}
          />
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

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default BasicUseFormHook;
