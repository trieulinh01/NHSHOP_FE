import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "@/common/hooks/useStorage";
import "./../../../styles/login.scss";
import { joiResolver } from "@hookform/resolvers/joi";

// Xác định schema cho dữ liệu đăng ký
const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({
            "any.only": "Passwords do not match",
        }),
});

const Signup = () => {
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage("user", {});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/signup",
                formData,
            );
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data);
            navigate("/signin");
        },
        onError: (error) => console.log(error),
    });

    // Hàm xử lý khi người dùng nhấn submit form
    const onSubmit = (formData) => {
        mutate(formData); // Gửi yêu cầu đăng ký thông tin người dùng
    };

    return (
        <div className="container" style={{ marginBottom: "200px" }}>
            <div className="form">
                <div className="form-close">
                    <img src="/close.svg" alt="" />
                </div>
                <h1 className="form-title">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="form-group">
                        <label className="form-group__label">Name:</label>{" "}
                        {/* Thêm trường "Name" */}
                        <input
                            {...register("name", { required: true })}
                            placeholder="Name"
                            className="form-group__input"
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-group__label">Email:</label>
                        <input
                            {...register("email", { required: true })}
                            placeholder="Email"
                            className="form-group__input"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-group__label">Password:</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Password"
                            className="form-group__input"
                            id="password"
                            name="password"
                            required
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-group__label">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            {...register("confirmPassword", { required: true })}
                            placeholder="Confirm Password"
                            className="form-group__input"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                        />
                        {errors.confirmPassword && (
                            <p>{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button type="submit" className="form-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
