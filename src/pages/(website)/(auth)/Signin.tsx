import { useLocalStorage } from "@/common/hooks/useStorage";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import "./../../../styles/login.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required(),
});

const Signin = () => {
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage("user", {});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/auth/signin",
                formData,
            );
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            setUser(data);
            toast.success("Bạn đã đăng nhập!");
            // navigate("/");
        },
        onError: (error) => console.log(error),
    });

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData);
    };
    return (
        <div className="container" style={{ marginBottom: "200px" }}>
            <div className="form">
                <div className="form-close">
                    <img src="/close.svg" alt="" />
                </div>
                <h1 className="form-title ">Login</h1>
                <form
                    action="../home/index.html"
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                >
                    <div className="form-group">
                        <label className="form-group__label">Username:</label>
                        <input
                            {...register("email", {
                                required: true,
                                minLength: 3,
                            })}
                            placeholder="Email"
                            className="form-group__input"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-group__label">Password:</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                            placeholder="Password"
                            className="form-group__input"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                    <button type="submit" className="form-button">
                        Login
                    </button>

                    <div className="form-social__button">
                        <button className="btn form-social__fb">
                            {" "}
                            <a>
                                <img src="../assets/icons/fb.svg" alt="" />
                                Facebook
                            </a>
                        </button>
                        <button className="form-social__gg btn">
                            <a href="">
                                <img src="../assets/icons/gg.svg" alt="" />
                                Google
                            </a>{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
