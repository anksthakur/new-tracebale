import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email must be in a valid format")
    .required("Email is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, 
                 "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        .required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required"),
});
