import * as yup from "yup";

export const formHookValidationSchema = yup.object({
    firstName: yup.string().required("Required using yup"),
    lastName: yup.string()
                .required("Required using yup")
                .max(4, "Exceeded value using yup")
});