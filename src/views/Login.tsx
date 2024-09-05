import MainLayout from "../layouts/MainLayout.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string,
    password: string,
};

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, formState: {errors}}
        = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const user = {
            email: data.email,
            password: data.password
        }
        fetch('http://localhost:3000/api/users/sign-in', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    setErrorMessage(response.error);
                } else {
                    setErrorMessage('');
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response.data))
                    navigate('/messenger')
                }
            })
    }

    return (
        <MainLayout>
            <h1 className={'text-center text-2xl font-bold'}>Đây là trang đăng nhập</h1>
            <div className="flex items-center justify-center h-max mt-10 py-10 bg-gray-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 rounded-md shadow-md w-96"
                >
                    <h2 className="text-lg font-semibold mb-4">Đăng Nhập</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register('email', {required: "bắt buộc phải nhập email"})}
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập email của bạn"
                        />
                        {errors.email && (
                            <div className={'text-red-500 pt-2'}>{errors.email.message}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            type="text"
                            id="password"
                            {...register('password', {required: "bắt buộc phải nhập mật khẩu"})}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        {errors.password && (
                            <div className={'text-red-500 pt-2'}>{errors.password.message}</div>
                        )}
                        {errorMessage && (
                            <div className={'text-red-500'}>{errorMessage}</div>)}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>

        </MainLayout>
    );
}

export default Login;
